package com.yatra.controller;

import com.yatra.dto.FestivalResponse;
import com.yatra.service.external.ExternalFestivalService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FestivalController {

    private final ExternalFestivalService festivalService;

    public FestivalController(ExternalFestivalService festivalService) {
        this.festivalService = festivalService;
    }

    @GetMapping("/api/festivals")
    public List<FestivalResponse> getFestivals(@RequestParam(required = false) Integer year) {
        return festivalService.getIndianFestivals(year);
    }
}
