package com.yatra.service;

import com.yatra.dto.TransitRouteResponse;
import com.yatra.model.City;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TransitRouteService {

    private final TourismService tourismService;
    private final GeoService geoService;

    public TransitRouteService(TourismService tourismService, GeoService geoService) {
        this.tourismService = tourismService;
        this.geoService = geoService;
    }

    public TransitRouteResponse calculateRoute(Long originCityId, Long destinationCityId) {
        City origin = tourismService.getCity(originCityId);
        City destination = tourismService.getCity(destinationCityId);

        double straightDistance = geoService.distanceKm(
                origin.getLatitude(), origin.getLongitude(),
                destination.getLatitude(), destination.getLongitude()
        );

        double roadDistance = Math.round(straightDistance * 1.25 * 10.0) / 10.0;
        List<TransitRouteResponse.TransitOption> options = new ArrayList<>();

        // 1. Train Option (Always available in Indian Rail network)
        int trainMinutes = Math.max(90, (int) Math.round((roadDistance / 75.0) * 60));
        int trainHours = trainMinutes / 60;
        int trainRemainMin = trainMinutes % 60;
        String trainType = roadDistance < 600 ? "Vande Bharat / Shatabdi Express" : "Rajdhani / Tejas Express";
        int trainFare = Math.max(450, (int) Math.round(180 + roadDistance * 2.2));

        options.add(new TransitRouteResponse.TransitOption(
                "TRAIN",
                "Indian Railways Superfast",
                trainType,
                trainMinutes,
                String.format("%dh %02dm", trainHours, trainRemainMin),
                trainFare,
                "Budget Friendly",
                "Daily 4-8 departures with AC 2A/3A & Chair Car berths",
                List.of("Scenic countryside route", "Reserved sleeper/executive seats", "Onboard meals available"),
                (int) Math.round(roadDistance * 0.04)
        ));

        // 2. Flight Option (for distances > 280 km)
        if (straightDistance > 280) {
            int flightMinutes = Math.max(65, (int) Math.round(50 + (straightDistance / 700.0) * 60));
            int flightHours = flightMinutes / 60;
            int flightRemainMin = flightMinutes % 60;
            int flightFare = Math.max(3200, (int) Math.round(2600 + straightDistance * 3.8));

            options.add(new TransitRouteResponse.TransitOption(
                    "FLIGHT",
                    "Domestic Non-Stop Airline",
                    "IndiGo / Air India / Akasa Air",
                    flightMinutes,
                    String.format("%dh %02dm", flightHours, flightRemainMin),
                    flightFare,
                    "Fastest",
                    "Multiple direct & 1-stop flights daily",
                    List.of("Shortest travel time", "15kg check-in luggage included", "Airport lounge access available"),
                    (int) Math.round(straightDistance * 0.16)
            ));
        }

        // 3. Intercity Bus Option
        int busMinutes = (int) Math.round((roadDistance / 55.0) * 60);
        int busHours = busMinutes / 60;
        int busRemainMin = busMinutes % 60;
        int busFare = Math.max(350, (int) Math.round(120 + roadDistance * 1.8));

        options.add(new TransitRouteResponse.TransitOption(
                "BUS",
                "Intercity Volvo Multi-Axle",
                "IntrCity SmartBus / Zingbus / State RTC",
                busMinutes,
                String.format("%dh %02dm", busHours, busRemainMin),
                busFare,
                "Budget Value",
                "Frequent overnight & day schedules",
                List.of("Reclining AC Sleeper berths", "Free mineral water & charging points", "City center pickups"),
                (int) Math.round(roadDistance * 0.07)
        ));

        // 4. Private Cab / Highway Drive
        int cabMinutes = (int) Math.round((roadDistance / 65.0) * 60);
        int cabHours = cabMinutes / 60;
        int cabRemainMin = cabMinutes % 60;
        int cabFare = Math.max(1200, (int) Math.round(400 + roadDistance * 13.5));

        options.add(new TransitRouteResponse.TransitOption(
                "CAB",
                "Private Outstation Highway Cab",
                "Sedan / Ertiga SUV with Chauffeur",
                cabMinutes,
                String.format("%dh %02dm", cabHours, cabRemainMin),
                cabFare,
                "Maximum Flexibility",
                "Door-to-door on-demand booking",
                List.of("Flexible stopovers at highway dhabas", "Toll & state taxes included", "Direct door-to-door drop"),
                (int) Math.round(roadDistance * 0.12)
        ));

        String recommended;
        if (straightDistance > 550) {
            recommended = "FLIGHT (Fastest & most comfortable for long haul)";
        } else if (roadDistance <= 350) {
            recommended = "TRAIN (Vande Bharat Express - quickest city-center to city-center travel)";
        } else {
            recommended = "TRAIN (Comfortable overnight train or swift direct flight)";
        }

        return new TransitRouteResponse(
                origin.getId(),
                origin.getName(),
                destination.getId(),
                destination.getName(),
                straightDistance,
                options,
                recommended
        );
    }
}
