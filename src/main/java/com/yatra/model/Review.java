package com.yatra.model;

public record Review(
        Long id,
        Long cityId,
        String travelerName,
        int rating,
        String comment,
        String travelMonth
) {
}
