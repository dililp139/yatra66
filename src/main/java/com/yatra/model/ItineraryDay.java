package com.yatra.model;

import java.util.List;

public record ItineraryDay(
        int day,
        String title,
        List<String> morning,
        List<String> afternoon,
        List<String> evening,
        int estimatedCost
) {
}
