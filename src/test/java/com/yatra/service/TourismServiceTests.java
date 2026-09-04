package com.yatra.service;

import com.yatra.dto.TripPlanRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class TourismServiceTests {

    @Autowired
    private TourismService tourismService;

    @Test
    void returnsIndiaMapMarkers() {
        assertThat(tourismService.getIndiaMapMarkers()).hasSizeGreaterThanOrEqualTo(8);
    }

    @Test
    void filtersCitiesByTheme() {
        assertThat(tourismService.findCities(null, null, "heritage", null, null))
                .hasSizeGreaterThanOrEqualTo(4);
    }

    @Test
    void returnsNearbyHotelsForCity() {
        assertThat(tourismService.findNearby(1L, null, null, 15, "hotel"))
                .isNotEmpty()
                .allMatch(place -> place.type().equals("hotel"));
    }

    @Test
    void estimatesCabFaresFromHotelsToAttractions() {
        assertThat(tourismService.getCabFares(1L, null))
                .isNotEmpty()
                .allMatch(fare -> fare.olaMini() > 0 && fare.uberGo() > 0 && fare.distanceKm() >= 0);
    }

    @Test
    void plansTripWithEstimatedCost() {
        var response = tourismService.planTrip(new TripPlanRequest(1L, 2, 2, 1500, "standard"));

        assertThat(response.cityName()).isEqualTo("Jaipur");
        assertThat(response.itinerary()).hasSize(2);
        assertThat(response.totalEstimatedCost()).isPositive();
    }
}
