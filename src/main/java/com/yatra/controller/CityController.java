package com.yatra.controller;

import com.yatra.dto.CabFareResponse;
import com.yatra.dto.CityDetailsResponse;
import com.yatra.dto.NearbyPlaceResponse;
import com.yatra.model.Attraction;
import com.yatra.model.City;
import com.yatra.model.Hotel;
import com.yatra.service.TourismService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CityController {

    private final TourismService tourismService;

    public CityController(TourismService tourismService) {
        this.tourismService = tourismService;
    }

    @GetMapping("/api/cities")
    public List<City> getCities(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String theme,
            @RequestParam(required = false) Integer minBudget,
            @RequestParam(required = false) Integer maxBudget
    ) {
        return tourismService.findCities(search, state, theme, minBudget, maxBudget);
    }

    @GetMapping("/api/cities/{cityId}")
    public CityDetailsResponse getCityDetails(@PathVariable Long cityId) {
        return tourismService.getCityDetails(cityId);
    }

    @GetMapping("/api/cities/{cityId}/attractions")
    public List<Attraction> getAttractions(@PathVariable Long cityId) {
        return tourismService.getAttractions(cityId);
    }

    @GetMapping("/api/cities/{cityId}/hotels")
    public List<Hotel> getHotels(
            @PathVariable Long cityId,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(required = false) Double minRating
    ) {
        return tourismService.getHotels(cityId, maxPrice, minRating);
    }

    @GetMapping("/api/cities/{cityId}/cab-fares")
    public List<CabFareResponse> getCabFares(
            @PathVariable Long cityId,
            @RequestParam(required = false) Long hotelId
    ) {
        return tourismService.getCabFares(cityId, hotelId);
    }

    @GetMapping("/api/cities/{cityId}/nearby")
    public List<NearbyPlaceResponse> getNearbyPlaces(
            @PathVariable Long cityId,
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double longitude,
            @RequestParam(defaultValue = "15") double radiusKm,
            @RequestParam(required = false) String type
    ) {
        return tourismService.findNearby(cityId, latitude, longitude, radiusKm, type);
    }
}
