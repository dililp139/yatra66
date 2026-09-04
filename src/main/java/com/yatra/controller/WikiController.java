package com.yatra.controller;

import com.yatra.dto.WikiSummaryResponse;
import com.yatra.model.City;
import com.yatra.service.TourismService;
import com.yatra.service.external.ExternalWikiService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WikiController {

    private final ExternalWikiService wikiService;
    private final TourismService tourismService;

    public WikiController(ExternalWikiService wikiService, TourismService tourismService) {
        this.wikiService = wikiService;
        this.tourismService = tourismService;
    }

    @GetMapping("/api/cities/{cityId}/wiki")
    public WikiSummaryResponse getCityWikiSummary(@PathVariable Long cityId) {
        City city = tourismService.getCity(cityId);
        return wikiService.getWikiSummary(city.getName());
    }

    @GetMapping("/api/wiki")
    public WikiSummaryResponse getCustomWikiSummary(@RequestParam String query) {
        return wikiService.getWikiSummary(query);
    }
}
