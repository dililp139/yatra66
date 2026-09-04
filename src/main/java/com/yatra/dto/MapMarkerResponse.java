package com.yatra.dto;

import java.util.List;

public record MapMarkerResponse(
        Long id,
        String name,
        String state,
        String region,
        double latitude,
        double longitude,
        double rating,
        int popularityScore,
        List<String> themes
) {
}
