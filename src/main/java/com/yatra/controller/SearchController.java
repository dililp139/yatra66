package com.yatra.controller;

import com.yatra.service.TourismService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class SearchController {

    private final TourismService tourismService;

    public SearchController(TourismService tourismService) {
        this.tourismService = tourismService;
    }

    @GetMapping("/api/search")
    public Map<String, Object> search(@RequestParam String q) {
        return tourismService.searchEverything(q);
    }
}
