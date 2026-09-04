package com.yatra.service;

import org.springframework.stereotype.Service;

@Service
public class GeoService {

    private static final double EARTH_RADIUS_KM = 6371.0;

    public double distanceKm(double fromLatitude, double fromLongitude, double toLatitude, double toLongitude) {
        double latDistance = Math.toRadians(toLatitude - fromLatitude);
        double lonDistance = Math.toRadians(toLongitude - fromLongitude);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(fromLatitude)) * Math.cos(Math.toRadians(toLatitude))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(EARTH_RADIUS_KM * c * 10.0) / 10.0;
    }
}
