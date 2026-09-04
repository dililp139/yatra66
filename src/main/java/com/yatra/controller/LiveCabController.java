package com.yatra.controller;

import com.yatra.dto.LiveCabFareResponse;
import com.yatra.service.LiveCabService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LiveCabController {

    private final LiveCabService liveCabService;

    public LiveCabController(LiveCabService liveCabService) {
        this.liveCabService = liveCabService;
    }

    @GetMapping("/api/cabs/live")
    public LiveCabFareResponse getLiveCabs(
            @RequestParam(defaultValue = "Hotel Pickup") String pickupName,
            @RequestParam(defaultValue = "26.9225") double pickupLat,
            @RequestParam(defaultValue = "75.8199") double pickupLng,
            @RequestParam(defaultValue = "Monument Drop") String dropName,
            @RequestParam(defaultValue = "26.9855") double dropLat,
            @RequestParam(defaultValue = "75.8513") double dropLng
    ) {
        return liveCabService.getLiveCabEstimates(pickupName, pickupLat, pickupLng, dropName, dropLat, dropLng);
    }
}
