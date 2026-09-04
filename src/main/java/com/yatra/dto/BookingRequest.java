package com.yatra.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BookingRequest(
        @NotBlank(message = "Customer name is required")
        String customerName,

        @NotBlank(message = "Customer email is required")
        String customerEmail,

        String customerPhone,

        @NotBlank(message = "Booking type is required (hotel, cab, package)")
        String bookingType,

        Long cityId,
        String cityName,

        String itemName, // Hotel name, route name, or package title
        String checkInDate,
        String checkOutDate,

        @NotNull(message = "Number of travelers is required")
        Integer travelers,

        Integer rooms,
        Integer totalAmountInr,
        String specialRequests
) {}
