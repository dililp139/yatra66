package com.yatra.service;

import com.yatra.dto.HotelComparisonResponse;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class HotelComparisonService {

    public HotelComparisonResponse compareHotelPrices(String hotelName, String cityName, int basePriceInr, double starRating) {
        int safeBasePrice = basePriceInr > 0 ? basePriceInr : 4500;
        String encodedHotel = URLEncoder.encode(hotelName, StandardCharsets.UTF_8);
        String encodedCity = URLEncoder.encode(cityName, StandardCharsets.UTF_8);

        List<HotelComparisonResponse.PlatformDeal> deals = new ArrayList<>();

        // 1. Yatra Direct (Best Price Guarantee)
        int yatraPrice = (int) Math.round(safeBasePrice * 0.88);
        deals.add(new HotelComparisonResponse.PlatformDeal(
                "Yatra Direct",
                yatraPrice,
                safeBasePrice - yatraPrice,
                "Lowest Guaranteed Rate 🔥",
                "#",
                "YATRADIR12",
                "🏨"
        ));

        // 2. MakeMyTrip (MMT)
        int mmtPrice = (int) Math.round(safeBasePrice * 0.94);
        String mmtUrl = String.format("https://www.makemytrip.com/hotels/hotel-listing/?city=%s&searchText=%s", encodedCity, encodedHotel);
        deals.add(new HotelComparisonResponse.PlatformDeal(
                "MakeMyTrip",
                mmtPrice,
                safeBasePrice - mmtPrice,
                "MMT Special Coupon",
                mmtUrl,
                "MMTHOTEL",
                "🔴"
        ));

        // 3. Agoda
        int agodaPrice = (int) Math.round(safeBasePrice * 0.91);
        String agodaUrl = String.format("https://www.agoda.com/search?city=%s&textToSearch=%s", encodedCity, encodedHotel);
        deals.add(new HotelComparisonResponse.PlatformDeal(
                "Agoda",
                agodaPrice,
                safeBasePrice - agodaPrice,
                "VIP Secret Deal",
                agodaUrl,
                "AGODAVIP",
                "🔵"
        ));

        // 4. Booking.com
        int bookingPrice = (int) Math.round(safeBasePrice * 0.90);
        String bookingUrl = String.format("https://www.booking.com/searchresults.html?ss=%s+%s", encodedHotel, encodedCity);
        deals.add(new HotelComparisonResponse.PlatformDeal(
                "Booking.com",
                bookingPrice,
                safeBasePrice - bookingPrice,
                "Genius Level 2 • Free Cancellation",
                bookingUrl,
                "GENIUS",
                "🔷"
        ));

        return new HotelComparisonResponse(
                hotelName,
                cityName,
                safeBasePrice,
                starRating,
                deals
        );
    }
}
