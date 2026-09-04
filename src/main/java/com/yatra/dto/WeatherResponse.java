package com.yatra.dto;

import java.util.List;

public record WeatherResponse(
        Long cityId,
        String cityName,
        double latitude,
        double longitude,
        double currentTemperature,
        double apparentTemperature,
        int relativeHumidity,
        double windSpeed,
        int weatherCode,
        String weatherCondition,
        String weatherIcon,
        String timezone,
        String packingTip,
        List<DailyForecast> dailyForecasts,
        boolean isLiveExternalData
) {
    public record DailyForecast(
            String date,
            int weatherCode,
            String weatherCondition,
            String weatherIcon,
            double maxTemperature,
            double minTemperature,
            String sunrise,
            String sunset
    ) {}
}
