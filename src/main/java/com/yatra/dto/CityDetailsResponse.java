package com.yatra.dto;

import com.yatra.model.Attraction;
import com.yatra.model.City;
import com.yatra.model.Hotel;
import com.yatra.model.Review;
import com.yatra.model.TravelTip;

import java.util.List;

public record CityDetailsResponse(
        City city,
        List<Attraction> famousPlaces,
        List<Hotel> recommendedHotels,
        List<TravelTip> travelTips,
        List<Review> reviews
) {
}
