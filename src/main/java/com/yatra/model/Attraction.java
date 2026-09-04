package com.yatra.model;

import java.util.List;

public record Attraction(
        Long id,
        Long cityId,
        String name,
        String category,
        String description,
        double latitude,
        double longitude,
        double rating,
        int recommendedHours,
        int entryFee,
        List<String> tags
) {
}
