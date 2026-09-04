package com.yatra.dto;

import java.util.List;

public record WikiSummaryResponse(
        String query,
        String title,
        String displayTitle,
        String extract,
        String description,
        String thumbnailUrl,
        String originalImageUrl,
        String wikipediaUrl,
        Double latitude,
        Double longitude,
        List<String> keyFacts,
        boolean isLiveExternalData
) {}
