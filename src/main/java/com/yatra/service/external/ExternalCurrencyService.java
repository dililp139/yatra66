package com.yatra.service.external;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;
import com.yatra.dto.CurrencyRatesResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.Duration;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Service
public class ExternalCurrencyService {

    private static final Logger log = LoggerFactory.getLogger(ExternalCurrencyService.class);
    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    private volatile CachedRates cachedRates;

    private record CachedRates(CurrencyRatesResponse response, long timestamp) {
        boolean isExpired() {
            return System.currentTimeMillis() - timestamp > Duration.ofHours(12).toMillis();
        }
    }

    private static final Map<String, String> CURRENCY_SYMBOLS = Map.of(
            "INR", "₹",
            "USD", "$",
            "EUR", "€",
            "GBP", "£",
            "AUD", "A$",
            "AED", "AED ",
            "SGD", "S$",
            "CAD", "C$",
            "JPY", "¥"
    );

    public ExternalCurrencyService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        this.restClient = RestClient.builder()
                .baseUrl("https://open.er-api.com/v6")
                .build();
    }

    public CurrencyRatesResponse getExchangeRates() {
        if (cachedRates != null && !cachedRates.isExpired()) {
            return cachedRates.response();
        }

        try {
            String rawJson = restClient.get()
                    .uri("/latest/INR")
                    .retrieve()
                    .body(String.class);

            if (rawJson != null && !rawJson.isBlank()) {
                JsonNode root = objectMapper.readTree(rawJson);
                JsonNode ratesNode = root.path("rates");

                Map<String, Double> rates = new HashMap<>();
                rates.put("INR", 1.0);
                for (String currency : CURRENCY_SYMBOLS.keySet()) {
                    if (ratesNode.has(currency)) {
                        rates.put(currency, ratesNode.path(currency).asDouble());
                    }
                }

                String time = root.path("time_last_update_utc").asText(Instant.now().toString());

                CurrencyRatesResponse response = new CurrencyRatesResponse(
                        "INR",
                        time,
                        rates,
                        CURRENCY_SYMBOLS,
                        true
                );

                cachedRates = new CachedRates(response, System.currentTimeMillis());
                return response;
            }
        } catch (Exception e) {
            log.warn("Failed to fetch live exchange rates from open.er-api.com: {}", e.getMessage());
        }

        CurrencyRatesResponse fallback = getFallbackRates();
        cachedRates = new CachedRates(fallback, System.currentTimeMillis());
        return fallback;
    }

    private CurrencyRatesResponse getFallbackRates() {
        Map<String, Double> fallbackRates = Map.of(
                "INR", 1.0,
                "USD", 0.0118,
                "EUR", 0.0109,
                "GBP", 0.0093,
                "AUD", 0.0182,
                "AED", 0.0433,
                "SGD", 0.0159,
                "CAD", 0.0163,
                "JPY", 1.8200
        );

        return new CurrencyRatesResponse(
                "INR",
                Instant.now().toString(),
                fallbackRates,
                CURRENCY_SYMBOLS,
                false
        );
    }
}
