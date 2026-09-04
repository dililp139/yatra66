package com.yatra.service.external;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;
import com.yatra.dto.WeatherResponse;
import com.yatra.model.City;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ExternalWeatherService {

    private static final Logger log = LoggerFactory.getLogger(ExternalWeatherService.class);
    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    private final Map<Long, CachedWeather> cache = new ConcurrentHashMap<>();

    private record CachedWeather(WeatherResponse response, long timestamp) {
        boolean isExpired() {
            return System.currentTimeMillis() - timestamp > Duration.ofMinutes(15).toMillis();
        }
    }

    public ExternalWeatherService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        this.restClient = RestClient.builder()
                .baseUrl("https://api.open-meteo.com")
                .build();
    }

    public WeatherResponse getWeatherForCity(City city) {
        CachedWeather cached = cache.get(city.getId());
        if (cached != null && !cached.isExpired()) {
            return cached.response();
        }

        try {
            String uri = String.format(
                    "/v1/forecast?latitude=%.4f&longitude=%.4f&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto",
                    city.getLatitude(), city.getLongitude()
            );

            String rawJson = restClient.get()
                    .uri(uri)
                    .retrieve()
                    .body(String.class);

            if (rawJson != null && !rawJson.isBlank()) {
                JsonNode root = objectMapper.readTree(rawJson);
                JsonNode current = root.path("current");
                JsonNode daily = root.path("daily");

                double currentTemp = current.path("temperature_2m").asDouble(28.0);
                double apparentTemp = current.path("apparent_temperature").asDouble(currentTemp);
                int humidity = current.path("relative_humidity_2m").asInt(55);
                double windSpeed = current.path("wind_speed_10m").asDouble(8.5);
                int weatherCode = current.path("weather_code").asInt(0);

                String condition = mapWeatherCodeToCondition(weatherCode);
                String icon = mapWeatherCodeToIcon(weatherCode);
                String packingTip = generatePackingTip(currentTemp, weatherCode);

                List<WeatherResponse.DailyForecast> dailyForecasts = new ArrayList<>();
                JsonNode timeArray = daily.path("time");
                JsonNode maxTempArray = daily.path("temperature_2m_max");
                JsonNode minTempArray = daily.path("temperature_2m_min");
                JsonNode dailyCodeArray = daily.path("weather_code");
                JsonNode sunriseArray = daily.path("sunrise");
                JsonNode sunsetArray = daily.path("sunset");

                for (int i = 0; i < timeArray.size() && i < 7; i++) {
                    int dayCode = dailyCodeArray.path(i).asInt(0);
                    dailyForecasts.add(new WeatherResponse.DailyForecast(
                            timeArray.path(i).asText(""),
                            dayCode,
                            mapWeatherCodeToCondition(dayCode),
                            mapWeatherCodeToIcon(dayCode),
                            maxTempArray.path(i).asDouble(30.0),
                            minTempArray.path(i).asDouble(20.0),
                            formatTime(sunriseArray.path(i).asText("")),
                            formatTime(sunsetArray.path(i).asText(""))
                    ));
                }

                WeatherResponse response = new WeatherResponse(
                        city.getId(),
                        city.getName(),
                        city.getLatitude(),
                        city.getLongitude(),
                        currentTemp,
                        apparentTemp,
                        humidity,
                        windSpeed,
                        weatherCode,
                        condition,
                        icon,
                        "Asia/Kolkata",
                        packingTip,
                        dailyForecasts,
                        true
                );

                cache.put(city.getId(), new CachedWeather(response, System.currentTimeMillis()));
                return response;
            }
        } catch (Exception e) {
            log.warn("Failed to fetch live weather from Open-Meteo for city {} ({}), falling back to estimate: {}",
                    city.getName(), city.getId(), e.getMessage());
        }

        WeatherResponse fallback = generateFallbackWeather(city);
        cache.put(city.getId(), new CachedWeather(fallback, System.currentTimeMillis()));
        return fallback;
    }

    private WeatherResponse generateFallbackWeather(City city) {
        double baseTemp = 27.0;
        if (city.getLatitude() > 30.0) baseTemp = 18.0; // Hill stations / North
        else if (city.getLatitude() < 15.0) baseTemp = 29.0; // Coastal south

        int weatherCode = 1;
        String condition = "Pleasant & Clear";
        String icon = "🌤️";
        String packingTip = generatePackingTip(baseTemp, weatherCode);

        List<WeatherResponse.DailyForecast> forecasts = new ArrayList<>();
        LocalDate today = LocalDate.now();
        for (int i = 0; i < 7; i++) {
            forecasts.add(new WeatherResponse.DailyForecast(
                    today.plusDays(i).toString(),
                    weatherCode,
                    condition,
                    icon,
                    baseTemp + 4,
                    baseTemp - 5,
                    "06:15 AM",
                    "06:45 PM"
            ));
        }

        return new WeatherResponse(
                city.getId(),
                city.getName(),
                city.getLatitude(),
                city.getLongitude(),
                baseTemp,
                baseTemp + 1.5,
                60,
                10.2,
                weatherCode,
                condition,
                icon,
                "Asia/Kolkata",
                packingTip,
                forecasts,
                false
        );
    }

    private String mapWeatherCodeToCondition(int code) {
        return switch (code) {
            case 0 -> "Clear Sky";
            case 1, 2, 3 -> "Partly Cloudy";
            case 45, 48 -> "Misty Fog";
            case 51, 53, 55 -> "Light Drizzle";
            case 61, 63, 65 -> "Rain Showers";
            case 71, 73, 75 -> "Snowfall";
            case 80, 81, 82 -> "Scattered Showers";
            case 95, 96, 99 -> "Thunderstorm";
            default -> "Fair & Pleasant";
        };
    }

    private String mapWeatherCodeToIcon(int code) {
        return switch (code) {
            case 0 -> "☀️";
            case 1, 2, 3 -> "⛅";
            case 45, 48 -> "🌫️";
            case 51, 53, 55 -> "🌦️";
            case 61, 63, 65 -> "🌧️";
            case 71, 73, 75 -> "❄️";
            case 80, 81, 82 -> "🌧️";
            case 95, 96, 99 -> "⛈️";
            default -> "🌤️";
        };
    }

    private String generatePackingTip(double temp, int code) {
        if (code >= 61 && code <= 82) {
            return "Rain showers likely. Pack an umbrella, quick-dry clothes, and waterproof footwear.";
        }
        if (code >= 95) {
            return "Thunderstorms expected. Keep a raincoat and secure indoor travel plans.";
        }
        if (temp < 15.0) {
            return "Cool weather. Pack warm jackets, thermal innerwear, and woolen caps.";
        }
        if (temp > 33.0) {
            return "Warm weather. Light breathable cottons, sunglasses, hydration, and sunblock essential.";
        }
        return "Pleasant travel climate. Light layers, walking shoes, and a light jacket for evenings recommended.";
    }

    private String formatTime(String isoString) {
        if (isoString == null || isoString.length() < 16) return isoString;
        return isoString.substring(11, 16);
    }
}
