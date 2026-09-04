package com.yatra.model;

import java.util.List;

public record Hotel(
        Long id,
        Long cityId,
        String name,
        String type,
        String address,
        double latitude,
        double longitude,
        double rating,
        int pricePerNight,
        List<String> amenities,
        List<Long> nearbyAttractionIds
) {
}
