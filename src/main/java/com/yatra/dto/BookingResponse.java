package com.yatra.dto;

import java.time.LocalDateTime;

public record BookingResponse(
        String bookingId, // e.g. YTR-892401
        String status,    // CONFIRMED, CANCELLED
        String customerName,
        String customerEmail,
        String customerPhone,
        String bookingType,
        Long cityId,
        String cityName,
        String itemName,
        String checkInDate,
        String checkOutDate,
        int travelers,
        int rooms,
        int baseAmountInr,
        int taxAmountInr,
        int totalAmountInr,
        String specialRequests,
        LocalDateTime bookedAt
) {}
