package com.yatra.controller;

import com.yatra.dto.HotelComparisonResponse;
import com.yatra.service.HotelComparisonService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HotelComparisonController {

    private final HotelComparisonService hotelComparisonService;

    public HotelComparisonController(HotelComparisonService hotelComparisonService) {
        this.hotelComparisonService = hotelComparisonService;
    }

    @GetMapping("/api/hotels/compare")
    public HotelComparisonResponse compareHotel(
            @RequestParam(defaultValue = "Heritage Haveli") String hotelName,
            @RequestParam(defaultValue = "Jaipur") String cityName,
            @RequestParam(defaultValue = "4500") int basePrice,
            @RequestParam(defaultValue = "4.6") double rating
    ) {
        return hotelComparisonService.compareHotelPrices(hotelName, cityName, basePrice, rating);
    }
}
