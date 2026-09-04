package com.yatra.dto;

import java.util.List;

public record LiveCabFareResponse(
        String pickupName,
        double pickupLat,
        double pickupLng,
        String dropName,
        double dropLat,
        double dropLng,
        double distanceKm,
        int estimatedMinutes,
        String trafficCondition,
        double surgeMultiplier,
        List<CabOption> olaOptions,
        List<CabOption> uberOptions
) {
    public record CabOption(
            String serviceName, // "Ola" or "Uber"
            String rideCategory, // "Mini", "Prime Sedan", "Auto", "Uber Go", "Premier", "Uber Auto"
            int estimatedFareInr,
            int driverEtaMinutes,
            int driversNearby,
            String capacity,
            String vehicleType,
            String directBookingUrl,
            String icon
    ) {}
}
