package com.yatra.dto;

public record CabFareResponse(
        Long hotelId,
        String hotelName,
        Long attractionId,
        String attractionName,
        double distanceKm,
        int olaMini,
        int olaPrime,
        int uberGo,
        int uberPremier,
        int estimatedMinutes
) {
}
