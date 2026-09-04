package com.yatra.controller;

import com.yatra.dto.TripPlanRequest;
import com.yatra.dto.TripPlanResponse;
import com.yatra.service.TourismService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TripPlanController {

    private final TourismService tourismService;

    public TripPlanController(TourismService tourismService) {
        this.tourismService = tourismService;
    }

    @PostMapping("/api/trip-plans")
    public TripPlanResponse planTrip(@Valid @RequestBody TripPlanRequest request) {
        return tourismService.planTrip(request);
    }
}
