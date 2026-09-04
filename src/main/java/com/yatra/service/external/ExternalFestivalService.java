package com.yatra.service.external;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;
import com.yatra.dto.FestivalResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ExternalFestivalService {

    private static final Logger log = LoggerFactory.getLogger(ExternalFestivalService.class);
    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    private final Map<Integer, CachedFestivals> cache = new ConcurrentHashMap<>();

    private record CachedFestivals(List<FestivalResponse> festivals, long timestamp) {
        boolean isExpired() {
            return System.currentTimeMillis() - timestamp > Duration.ofDays(1).toMillis();
        }
    }

    public ExternalFestivalService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        this.restClient = RestClient.builder()
                .baseUrl("https://date.nager.at/api/v3")
                .build();
    }

    public List<FestivalResponse> getIndianFestivals(Integer year) {
        int targetYear = (year != null && year >= 2024 && year <= 2030) ? year : LocalDate.now().getYear();

        CachedFestivals cached = cache.get(targetYear);
        if (cached != null && !cached.isExpired()) {
            return cached.festivals();
        }

        List<FestivalResponse> results = new ArrayList<>();
        try {
            String rawJson = restClient.get()
                    .uri("/PublicHolidays/{year}/IN", targetYear)
                    .retrieve()
                    .body(String.class);

            if (rawJson != null && !rawJson.isBlank()) {
                JsonNode array = objectMapper.readTree(rawJson);
                if (array.isArray()) {
                    for (JsonNode item : array) {
                        String date = item.path("date").asText("");
                        String localName = item.path("localName").asText("");
                        String englishName = item.path("name").asText(localName);
                        boolean isNational = item.path("global").asBoolean(true);

                        results.add(enrichHoliday(englishName, localName, date, isNational));
                    }
                }
            }
        } catch (Exception e) {
            log.warn("Failed to fetch public holidays from Nager.Date API: {}", e.getMessage());
        }

        if (results.isEmpty()) {
            results = new ArrayList<>(getCuratedFestivals(targetYear));
        } else {
            // Merge in prominent cultural festivals that might not be declared gazetted national holidays
            mergeMajorCulturalFestivals(results, targetYear);
        }

        results.sort(Comparator.comparing(FestivalResponse::date));
        cache.put(targetYear, new CachedFestivals(results, System.currentTimeMillis()));
        return results;
    }

    private FestivalResponse enrichHoliday(String name, String localName, String date, boolean isNational) {
        String lower = (name + " " + localName).toLowerCase();
        String month = parseMonth(date);

        if (lower.contains("diwali") || lower.contains("deepavali")) {
            return new FestivalResponse(
                    "Diwali (Festival of Lights)", localName, date, "Spiritual & Cultural", month,
                    "Celebrates the victory of light over darkness. Cities glow with millions of clay lamps (diyas), fireworks, sweets, and illuminated riverfronts.",
                    List.of("Varanasi", "Jaipur", "Delhi", "Ayodhya"),
                    "Varanasi's Dev Deepawali ghats and Jaipur's decorated bazaars offer world-class spectacles. Book stays at least 6 weeks in advance.",
                    isNational
            );
        } else if (lower.contains("holi")) {
            return new FestivalResponse(
                    "Holi (Festival of Colors)", localName, date, "Cultural & Heritage", month,
                    "Welcomes spring with joyful organic powder colors, celebratory folk songs, sweets like gujiya, and vibrant town gatherings.",
                    List.of("Jaipur", "Udaipur", "Mathura", "Varanasi"),
                    "Wear modest clothes you don't mind discarding; protect camera equipment with waterproof bags.",
                    isNational
            );
        } else if (lower.contains("republic")) {
            return new FestivalResponse(
                    "Republic Day", localName, date, "National Honor", month,
                    "Commemorates the adoption of the Constitution of India with the grandeur of the Kartavya Path parade showcasing military and regional cultural tableaus.",
                    List.of("Delhi"),
                    "Book grandstand tickets early or explore Delhi's illuminated government buildings during the Beating Retreat ceremony.",
                    isNational
            );
        } else if (lower.contains("independence")) {
            return new FestivalResponse(
                    "Independence Day", localName, date, "National Honor", month,
                    "Commemorates India's freedom with the flag hoisting ceremony at the historic Red Fort and vibrant kite-flying across Old Delhi.",
                    List.of("Delhi", "Mumbai"),
                    "Old Delhi rooftops and monuments offer colorful skies packed with kite battles.",
                    isNational
            );
        } else if (lower.contains("gandhi")) {
            return new FestivalResponse(
                    "Mahatma Gandhi Jayanti", localName, date, "National Heritage", month,
                    "Honors the father of the nation with peaceful prayer services, classical spinning demonstrations, and visits to historical memorials.",
                    List.of("Delhi", "Ahmedabad"),
                    "Visit Raj Ghat and Gandhi Smriti in Delhi for reflective exhibitions.",
                    isNational
            );
        } else if (lower.contains("eid")) {
            return new FestivalResponse(
                    name, localName, date, "Spiritual & Gastronomy", month,
                    "Celebrated with prayers at historic mosques, family gatherings, and renowned culinary trails featuring biryanis, kebabs, and sheer khurma.",
                    List.of("Delhi (Jama Masjid)", "Mumbai (Mohammad Ali Road)", "Hyderabad"),
                    "Night food walks around historic mosques are unmissable culinary spectacles.",
                    isNational
            );
        } else if (lower.contains("christmas")) {
            return new FestivalResponse(
                    "Christmas Celebration", localName, date, "Cultural & Festive", month,
                    "Celebrated across India's colonial churches, with midnight masses, beach parties, carols, and traditional fruit cakes.",
                    List.of("Goa", "Kochi", "Mumbai", "Kolkata"),
                    "Goa's historic Portuguese churches and Fort Kochi's carnival come alive with lights and music.",
                    isNational
            );
        }

        return new FestivalResponse(
                name, localName, date, "Cultural Heritage", month,
                "A significant celebration highlighting India's rich mosaic of regional customs, culinary delicacies, and community gatherings.",
                List.of("Delhi", "Mumbai", "Jaipur"),
                "Check monument opening hours ahead of time as some heritage sites may observe holiday timings.",
                isNational
        );
    }

    private void mergeMajorCulturalFestivals(List<FestivalResponse> list, int year) {
        boolean hasOnam = list.stream().anyMatch(f -> f.name().toLowerCase().contains("onam"));
        if (!hasOnam) {
            list.add(new FestivalResponse(
                    "Onam Harvest Festival", "ഓണം", year + "-09-02", "Harvest & Art", "September",
                    "Kerala's grand harvest festival featuring exquisite floral floor designs (Pookalam), legendary snake boat races (Vallamkali), and grand vegetarian feasts (Onasadya).",
                    List.of("Kochi", "Alappuzha", "Thiruvananthapuram"),
                    "Witness snake boat races on backwaters and savor authentic 26-dish sadya meals.",
                    false
            ));
        }

        boolean hasDurgaPuja = list.stream().anyMatch(f -> f.name().toLowerCase().contains("durga"));
        if (!hasDurgaPuja) {
            list.add(new FestivalResponse(
                    "Durga Puja Carnival", "দুর্গাপূজা", year + "-10-18", "UNESCO Heritage & Art", "October",
                    "UNESCO-recognized cultural spectacle featuring thousands of artistic bamboo and clay pandals, street food carnivals, and cultural performances.",
                    List.of("Kolkata", "Delhi"),
                    "Pandal-hopping at night in Kolkata is one of the world's most spectacular public art installations.",
                    false
            ));
        }

        boolean hasGanesh = list.stream().anyMatch(f -> f.name().toLowerCase().contains("ganesh"));
        if (!hasGanesh) {
            list.add(new FestivalResponse(
                    "Ganesh Chaturthi", "गणेशोत्सव", year + "-09-14", "Spiritual & Procession", "September",
                    "Maharashtra's grand ten-day celebration with towering clay idols of Lord Ganesha, drum bands, and massive immersion processions along Mumbai's beaches.",
                    List.of("Mumbai", "Pune"),
                    "Visit Lalbaugcha Raja in Mumbai and join the Marine Drive/Girgaon Chowpatty visarjan energy.",
                    false
            ));
        }
    }

    private List<FestivalResponse> getCuratedFestivals(int year) {
        return List.of(
                new FestivalResponse("Republic Day", "गणतंत्र दिवस", year + "-01-26", "National Honor", "January", "Grand military and cultural parade on Kartavya Path.", List.of("Delhi"), "Watch the illuminated India Gate and parades.", true),
                new FestivalResponse("Holi (Festival of Colors)", "होली", year + "-03-25", "Cultural & Heritage", "March", "Celebration of colors, spring blossoms, and sweets.", List.of("Jaipur", "Udaipur", "Varanasi"), "Enjoy royal palace Holi celebrations.", true),
                new FestivalResponse("Independence Day", "स्वतंत्रता दिवस", year + "-08-15", "National Honor", "August", "National freedom celebrations with Red Fort flag hoisting.", List.of("Delhi"), "Experience kite festivals in Old Delhi.", true),
                new FestivalResponse("Onam", "ഓണം", year + "-09-05", "Harvest & Art", "September", "Kerala's backwater snake boat races and grand floral rugs.", List.of("Kochi"), "Reserve backwater boat cruise views early.", false),
                new FestivalResponse("Ganesh Chaturthi", "गणेशोत्सव", year + "-09-18", "Spiritual & Procession", "September", "Giant idols and drum processions along Arabian sea beaches.", List.of("Mumbai"), "Experience Chowpatty beach processions.", false),
                new FestivalResponse("Durga Puja", "দুর্গাপূজা", year + "-10-20", "UNESCO Heritage & Art", "October", "Mesmerizing illuminated public art pandals and feasts.", List.of("Kolkata", "Delhi"), "Do midnight pandal walks.", false),
                new FestivalResponse("Diwali (Festival of Lights)", "दीपावली", year + "-11-01", "Spiritual & Cultural", "November", "Millions of lamps along the Ganges and illuminated palaces.", List.of("Varanasi", "Jaipur", "Ayodhya"), "Watch Dev Deepawali in Varanasi.", true),
                new FestivalResponse("Christmas", "बड़ा दिन", year + "-12-25", "Cultural & Festive", "December", "Midnight masses in historic 16th century churches and beach shacks.", List.of("Goa", "Kochi"), "Book Christmas Eve cruises in Goa.", true)
        );
    }

    private String parseMonth(String date) {
        if (date == null || date.length() < 7) return "Festival Season";
        int monthNum = Integer.parseInt(date.substring(5, 7));
        return switch (monthNum) {
            case 1 -> "January";
            case 2 -> "February";
            case 3 -> "March";
            case 4 -> "April";
            case 5 -> "May";
            case 6 -> "June";
            case 7 -> "July";
            case 8 -> "August";
            case 9 -> "September";
            case 10 -> "October";
            case 11 -> "November";
            case 12 -> "December";
            default -> "Festival Season";
        };
    }
}
