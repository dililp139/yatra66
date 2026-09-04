package com.yatra.controller;

import com.yatra.dto.WeatherResponse;
import com.yatra.model.City;
import com.yatra.service.TourismService;
import com.yatra.service.external.ExternalWeatherService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class WeatherController {

    private final ExternalWeatherService weatherService;
    private final TourismService tourismService;

    public WeatherController(ExternalWeatherService weatherService, TourismService tourismService) {
        this.weatherService = weatherService;
        this.tourismService = tourismService;
    }

    @GetMapping("/api/weather/{cityId}")
    public WeatherResponse getWeatherForCity(@PathVariable Long cityId) {
        City city = tourismService.getCity(cityId);
        return weatherService.getWeatherForCity(city);
    }

    @GetMapping("/api/weather")
    public List<WeatherResponse> getAllCitiesWeather() {
        return tourismService.findCities(null, null, null, null, null).stream()
                .limit(8)
                .map(weatherService::getWeatherForCity)
                .toList();
    }
}
