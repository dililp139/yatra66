package com.yatra.dto;

import com.yatra.model.ItineraryDay;

import java.util.List;

public record TripPlanResponse(
        Long cityId,
        String cityName,
        int days,
        int travelers,
        String travelStyle,
        int estimatedStayCost,
        int estimatedFoodAndLocalTravelCost,
        int attractionFees,
        int totalEstimatedCost,
        List<ItineraryDay> itinerary
) {
}
