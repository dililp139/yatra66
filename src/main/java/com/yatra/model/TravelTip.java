package com.yatra.model;

public record TravelTip(
        Long id,
        Long cityId,
        String title,
        String detail,
        String type
) {
}
