package com.yatra.controller;

import com.yatra.dto.TransitRouteResponse;
import com.yatra.service.TransitRouteService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RouteController {

    private final TransitRouteService routeService;

    public RouteController(TransitRouteService routeService) {
        this.routeService = routeService;
    }

    @GetMapping("/api/routes")
    public TransitRouteResponse getRoute(
            @RequestParam(defaultValue = "1") Long fromCityId,
            @RequestParam(defaultValue = "2") Long toCityId
    ) {
        return routeService.calculateRoute(fromCityId, toCityId);
    }
}
