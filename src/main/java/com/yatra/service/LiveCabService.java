package com.yatra.service;

import com.yatra.dto.LiveCabFareResponse;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class LiveCabService {

    private final GeoService geoService;

    public LiveCabService(GeoService geoService) {
        this.geoService = geoService;
    }

    public LiveCabFareResponse getLiveCabEstimates(
            String pickupName, double pickupLat, double pickupLng,
            String dropName, double dropLat, double dropLng
    ) {
        double straightDistance = geoService.distanceKm(pickupLat, pickupLng, dropLat, dropLng);
        double roadDistance = Math.max(1.2, Math.round(straightDistance * 1.35 * 10.0) / 10.0);

        // Calculate traffic conditions based on time of day
        int currentHour = LocalTime.now().getHour();
        boolean isPeakHour = (currentHour >= 8 && currentHour <= 10) || (currentHour >= 18 && currentHour <= 21);
        double trafficMultiplier = isPeakHour ? 1.25 : 1.05;
        double surge = isPeakHour ? 1.2 : 1.0;
        String trafficCondition = isPeakHour ? "Moderate-Heavy Traffic (Peak Hours)" : "Smooth City Flow";

        int avgSpeedKmH = isPeakHour ? 22 : 32;
        int estimatedMinutes = Math.max(8, (int) Math.round((roadDistance / avgSpeedKmH) * 60) + 4);

        // Build deep-links for direct booking on web / mobile app
        String uberDeepLink = String.format(
                "https://m.uber.com/ul/?action=setPickup&client_id=yatra&pickup[latitude]=%.6f&pickup[longitude]=%.6f&pickup[nickname]=%s&dropoff[latitude]=%.6f&dropoff[longitude]=%.6f&dropoff[nickname]=%s",
                pickupLat, pickupLng, urlEncode(pickupName),
                dropLat, dropLng, urlEncode(dropName)
        );

        String olaDeepLink = String.format(
                "https://book.olacabs.com/?pickup_lat=%.6f&pickup_lng=%.6f&pickup_name=%s&drop_lat=%.6f&drop_lng=%.6f&drop_name=%s",
                pickupLat, pickupLng, urlEncode(pickupName),
                dropLat, dropLng, urlEncode(dropName)
        );

        // 1. Ola Options
        List<LiveCabFareResponse.CabOption> olaOptions = new ArrayList<>();
        int olaAutoFare = Math.max(45, (int) Math.round((35 + roadDistance * 14.0) * surge));
        olaOptions.add(new LiveCabFareResponse.CabOption(
                "Ola", "Ola Auto", olaAutoFare, 3, 7, "3 Seats", "Auto Rickshaw", olaDeepLink, "🛺"
        ));

        int olaMiniFare = Math.max(90, (int) Math.round((55 + roadDistance * 20.0) * surge));
        olaOptions.add(new LiveCabFareResponse.CabOption(
                "Ola", "Ola Mini", olaMiniFare, 4, 12, "4 Seats", "Compact AC Hatchback (WagonR/Indica)", olaDeepLink, "🚗"
        ));

        int olaPrimeFare = Math.max(130, (int) Math.round((75 + roadDistance * 26.0) * surge));
        olaOptions.add(new LiveCabFareResponse.CabOption(
                "Ola", "Ola Prime Sedan", olaPrimeFare, 5, 8, "4 Seats", "Spacious Sedan with Free WiFi (Dzire/Etios)", olaDeepLink, "🚘"
        ));

        // 2. Uber Options
        List<LiveCabFareResponse.CabOption> uberOptions = new ArrayList<>();
        int uberAutoFare = Math.max(40, (int) Math.round((32 + roadDistance * 13.5) * surge));
        uberOptions.add(new LiveCabFareResponse.CabOption(
                "Uber", "Uber Auto", uberAutoFare, 2, 9, "3 Seats", "Affordable Auto Rides", uberDeepLink, "🛺"
        ));

        int uberGoFare = Math.max(85, (int) Math.round((50 + roadDistance * 19.5) * surge));
        uberOptions.add(new LiveCabFareResponse.CabOption(
                "Uber", "Uber Go", uberGoFare, 3, 15, "4 Seats", "Affordable Compact Rides", uberDeepLink, "🚗"
        ));

        int uberPremierFare = Math.max(140, (int) Math.round((80 + roadDistance * 27.5) * surge));
        uberOptions.add(new LiveCabFareResponse.CabOption(
                "Uber", "Uber Premier", uberPremierFare, 4, 6, "4 Seats", "Premium Sedans with Top-Rated Drivers", uberDeepLink, "🚘"
        ));

        return new LiveCabFareResponse(
                pickupName != null ? pickupName : "Selected Hotel",
                pickupLat,
                pickupLng,
                dropName != null ? dropName : "Destination",
                dropLat,
                dropLng,
                roadDistance,
                estimatedMinutes,
                trafficCondition,
                surge,
                olaOptions,
                uberOptions
        );
    }

    private String urlEncode(String text) {
        if (text == null) return "";
        return URLEncoder.encode(text, StandardCharsets.UTF_8);
    }
}
