package com.yatra.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ReviewRequest(
        @NotNull(message = "City ID is required")
        Long cityId,

        @NotBlank(message = "Traveler name is required")
        String travelerName,

        @NotNull(message = "Rating is required")
        @Min(value = 1, message = "Rating must be at least 1")
        @Max(value = 5, message = "Rating cannot exceed 5")
        Integer rating,

        @NotBlank(message = "Comment is required")
        String comment,

        String travelMonth
) {}
