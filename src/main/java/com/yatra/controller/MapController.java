package com.yatra.controller;

import com.yatra.dto.MapMarkerResponse;
import com.yatra.service.TourismService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class MapController {

    private final TourismService tourismService;

    public MapController(TourismService tourismService) {
        this.tourismService = tourismService;
    }

    @GetMapping("/api/map/india")
    public Map<String, Object> getIndiaMap() {
        List<MapMarkerResponse> markers = tourismService.getIndiaMapMarkers();
        return Map.of(
                "country", "India",
                "center", Map.of("latitude", 22.9734, "longitude", 78.6569),
                "defaultZoom", 5,
                "markers", markers
        );
    }
}
