package com.yatra.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record TripPlanRequest(
        @NotNull Long cityId,
        @Min(1) @Max(30) int days,
        @Min(1) @Max(20) int travelers,
        @Min(500) int dailyBudgetPerPerson,
        String travelStyle
) {
}
