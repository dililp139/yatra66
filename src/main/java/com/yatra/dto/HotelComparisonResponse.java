package com.yatra.dto;

import java.util.List;

public record HotelComparisonResponse(
        String hotelName,
        String cityName,
        int basePriceInr,
        double starRating,
        List<PlatformDeal> platformDeals
) {
    public record PlatformDeal(
            String platformName, // "MakeMyTrip", "Agoda", "Booking.com", "Yatra Direct"
            int dealPriceInr,
            int savingsInr,
            String badge,
            String directBookingUrl,
            String couponCode,
            String icon
    ) {}
}
