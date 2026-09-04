package com.yatra.service.external;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;
import com.yatra.dto.WikiSummaryResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ExternalWikiService {

    private static final Logger log = LoggerFactory.getLogger(ExternalWikiService.class);
    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    private final Map<String, CachedWiki> cache = new ConcurrentHashMap<>();

    private record CachedWiki(WikiSummaryResponse response, long timestamp) {
        boolean isExpired() {
            return System.currentTimeMillis() - timestamp > Duration.ofHours(6).toMillis();
        }
    }

    public ExternalWikiService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        this.restClient = RestClient.builder()
                .baseUrl("https://en.wikipedia.org/api/rest_v1")
                .defaultHeader("User-Agent", "YatraTravelGuide/1.0 (Tourism discovery in India; support@yatra.in)")
                .defaultHeader("Accept", "application/json")
                .build();
    }

    public WikiSummaryResponse getWikiSummary(String titleOrQuery) {
        if (titleOrQuery == null || titleOrQuery.isBlank()) {
            titleOrQuery = "Tourism in India";
        }
        String normalizedKey = titleOrQuery.trim().toLowerCase();

        CachedWiki cached = cache.get(normalizedKey);
        if (cached != null && !cached.isExpired()) {
            return cached.response();
        }

        try {
            String encodedTitle = URLEncoder.encode(titleOrQuery.trim().replace(" ", "_"), StandardCharsets.UTF_8);
            String rawJson = restClient.get()
                    .uri("/page/summary/{title}", encodedTitle)
                    .retrieve()
                    .body(String.class);

            if (rawJson != null && !rawJson.isBlank()) {
                JsonNode root = objectMapper.readTree(rawJson);
                String title = root.path("title").asText(titleOrQuery);
                String displayTitle = root.path("displaytitle").asText(title);
                String extract = root.path("extract").asText("");
                String description = root.path("description").asText("");

                String thumbnailUrl = root.path("thumbnail").path("source").asText(null);
                String originalImageUrl = root.path("originalimage").path("source").asText(thumbnailUrl);
                String wikiPageUrl = root.path("content_urls").path("desktop").path("page").asText("https://en.wikipedia.org/wiki/" + encodedTitle);

                Double lat = root.has("coordinates") ? root.path("coordinates").path("lat").asDouble() : null;
                Double lon = root.has("coordinates") ? root.path("coordinates").path("lon").asDouble() : null;

                List<String> keyFacts = extractKeyFacts(extract, description);

                WikiSummaryResponse response = new WikiSummaryResponse(
                        titleOrQuery,
                        title,
                        displayTitle,
                        extract,
                        description,
                        thumbnailUrl,
                        originalImageUrl,
                        wikiPageUrl,
                        lat,
                        lon,
                        keyFacts,
                        true
                );

                cache.put(normalizedKey, new CachedWiki(response, System.currentTimeMillis()));
                return response;
            }
        } catch (Exception e) {
            log.warn("Failed to fetch live summary from Wikipedia for query '{}': {}", titleOrQuery, e.getMessage());
        }

        WikiSummaryResponse fallback = generateFallbackSummary(titleOrQuery);
        cache.put(normalizedKey, new CachedWiki(fallback, System.currentTimeMillis()));
        return fallback;
    }

    private List<String> extractKeyFacts(String extract, String description) {
        List<String> facts = new ArrayList<>();
        if (description != null && !description.isBlank()) {
            facts.add(description);
        }
        if (extract != null && !extract.isBlank()) {
            String[] sentences = extract.split("\\.\\s+");
            for (int i = 0; i < sentences.length && facts.size() < 4; i++) {
                String sentence = sentences[i].trim();
                if (!sentence.isEmpty() && sentence.length() > 20) {
                    facts.add(sentence.endsWith(".") ? sentence : sentence + ".");
                }
            }
        }
        return facts;
    }

    private WikiSummaryResponse generateFallbackSummary(String query) {
        String title = query.substring(0, 1).toUpperCase() + (query.length() > 1 ? query.substring(1) : "");
        String extract = switch (title.toLowerCase()) {
            case "jaipur" -> "Jaipur is the capital of India's Rajasthan state. It evokes the royal family that once ruled the region and that, in 1727, founded what is now called the Old City, or 'Pink City' for its trademark building color.";
            case "agra" -> "Agra is a city on the banks of the Yamuna river in the Indian state of Uttar Pradesh. It is a major tourist destination because of its Mughal-era buildings, notably the Taj Mahal, Agra Fort, and Fatehpur Sikri.";
            case "mumbai" -> "Mumbai (formerly Bombay) is a densely populated city on India's west coast. A financial center, it's India's largest city. On the Mumbai Harbour waterfront stands the iconic Gateway of India stone arch.";
            case "delhi" -> "Delhi, India’s capital territory, is a massive metropolitan area in the country’s north. In Old Delhi, a neighborhood dating to the 1600s, stands the imposing Mughal-era Red Fort.";
            case "udaipur" -> "Udaipur, formerly the capital of the Mewar Kingdom, is a city in the western Indian state of Rajasthan. Founded by Maharana Udai Singh II in 1559, it’s set around a series of artificial lakes and is known for its lavish royal residences.";
            case "varanasi" -> "Varanasi is a city in the northern Indian state of Uttar Pradesh dating to the 11th century B.C. Regarded as the spiritual capital of India, the city draws Hindu pilgrims who bathe in the sacred Ganges River waters.";
            case "goa" -> "Goa is a state in western India with coastlines stretching along the Arabian Sea. Its long history as a Portuguese colony prior to 1961 is evident in its preserved 17th-century churches and the area’s tropical spice plantations.";
            case "kochi" -> "Kochi (also known as Cochin) is a vibrant city situated on the southwest coast of the Indian state of Kerala. Known as the 'Queen of the Arabian Sea', it has been an important spice trading centre on the west coast of India since the 14th century.";
            case "amritsar" -> "Amritsar is a city in the northwestern Indian state of Punjab, 28 kilometers from the border with Pakistan. At the center of its walled old town, the gilded Golden Temple (Harmandir Sahib) is the holiest gurdwara of the Sikh religion.";
            case "manali" -> "Manali is a high-altitude Himalayan resort town in India’s northern Himachal Pradesh state. It has a reputation as a backpacking center and honeymoon destination set on the Beas River.";
            case "rishikesh" -> "Rishikesh is a city in India’s northern state of Uttarakhand, in the Himalayan foothills beside the Ganges River. The river is considered holy, and the city is renowned as a center for studying yoga and meditation.";
            case "darjeeling" -> "Darjeeling is a town in India's West Bengal state, in the Himalayan foothills. Once a summer resort for the British Raj elite, it remains the terminus of the narrow-gauge Darjeeling Himalayan Railway, or 'Toy Train,' completed in 1881.";
            case "hampi" -> "Hampi is an ancient village in the south Indian state of Karnataka. It’s dotted with numerous ruined temple complexes from the Vijayanagara Empire, set among river boulders and coconut groves.";
            default -> title + " is one of India's celebrated travel destinations, rich in cultural heritage, local architecture, vibrant arts, and diverse regional traditions.";
        };

        return new WikiSummaryResponse(
                query,
                title,
                title,
                extract,
                "Prominent Indian cultural destination",
                "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&auto=format&fit=crop&q=80",
                "https://en.wikipedia.org/wiki/" + URLEncoder.encode(title.replace(" ", "_"), StandardCharsets.UTF_8),
                20.5937,
                78.9629,
                List.of(
                        "Celebrated destination showcasing authentic regional heritage.",
                        "Direct rail, highway, and air connectivity across India.",
                        "Rich culinary history with signature local flavors."
                ),
                false
        );
    }
}
