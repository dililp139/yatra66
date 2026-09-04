package com.yatra.dto;

import java.util.List;

public record TransitRouteResponse(
        Long originCityId,
        String originCityName,
        Long destinationCityId,
        String destinationCityName,
        double straightDistanceKm,
        List<TransitOption> options,
        String recommendedOption
) {
    public record TransitOption(
            String mode, // FLIGHT, TRAIN, BUS, CAB
            String title,
            String operatorOrType, // e.g. "Vande Bharat Express", "IndiGo / Air India", "Volvo Multi-Axle", "Outstation Sedan"
            int durationMinutes,
            String durationFormatted,
            int estimatedFareInr,
            String priceCategory, // Budget, Moderate, Premium
            String frequency, // e.g. "Daily 4 trains", "Direct 1h 15m"
            List<String> highlights,
            int carbonKg
    ) {}
}
