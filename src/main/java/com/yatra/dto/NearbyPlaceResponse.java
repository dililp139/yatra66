package com.yatra.dto;

public record NearbyPlaceResponse(
        Long id,
        String name,
        String type,
        String category,
        double latitude,
        double longitude,
        double rating,
        int price,
        double distanceKm
) {
}
