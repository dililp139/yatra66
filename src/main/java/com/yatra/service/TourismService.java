package com.yatra.service;

import com.yatra.dto.CityDetailsResponse;
import com.yatra.dto.CabFareResponse;
import com.yatra.dto.MapMarkerResponse;
import com.yatra.dto.NearbyPlaceResponse;
import com.yatra.dto.TripPlanRequest;
import com.yatra.dto.TripPlanResponse;
import com.yatra.exception.ResourceNotFoundException;
import com.yatra.model.Attraction;
import com.yatra.model.City;
import com.yatra.model.Hotel;
import com.yatra.model.ItineraryDay;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Stream;

@Service
public class TourismService {

    private final TourismDataStore dataStore;
    private final GeoService geoService;

    public TourismService(TourismDataStore dataStore, GeoService geoService) {
        this.dataStore = dataStore;
        this.geoService = geoService;
    }

    public List<City> findCities(String search, String state, String theme, Integer minBudget, Integer maxBudget) {
        return dataStore.cities().stream()
                .filter(city -> matchesText(city.getName(), search)
                        || matchesText(city.getState(), search)
                        || matchesText(city.getDescription(), search))
                .filter(city -> state == null || city.getState().equalsIgnoreCase(state))
                .filter(city -> theme == null || city.getThemes().stream().anyMatch(item -> item.equalsIgnoreCase(theme)))
                .filter(city -> minBudget == null || city.getEstimatedDailyBudget() >= minBudget)
                .filter(city -> maxBudget == null || city.getEstimatedDailyBudget() <= maxBudget)
                .sorted(Comparator.comparingInt(City::getPopularityScore).reversed())
                .toList();
    }

    public City getCity(Long cityId) {
        return dataStore.cities().stream()
                .filter(city -> city.getId().equals(cityId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("City " + cityId + " does not exist"));
    }

    public CityDetailsResponse getCityDetails(Long cityId) {
        City city = getCity(cityId);
        return new CityDetailsResponse(
                city,
                getAttractions(cityId),
                getHotels(cityId, null, null),
                dataStore.tips().stream().filter(tip -> tip.cityId().equals(cityId)).toList(),
                dataStore.reviews().stream().filter(review -> review.cityId().equals(cityId)).toList()
        );
    }

    public List<Attraction> getAttractions(Long cityId) {
        getCity(cityId);
        return dataStore.attractions().stream()
                .filter(attraction -> attraction.cityId().equals(cityId))
                .sorted(Comparator.comparingDouble(Attraction::rating).reversed())
                .toList();
    }

    public List<Hotel> getHotels(Long cityId, Integer maxPrice, Double minRating) {
        getCity(cityId);
        return dataStore.hotels().stream()
                .filter(hotel -> hotel.cityId().equals(cityId))
                .filter(hotel -> maxPrice == null || hotel.pricePerNight() <= maxPrice)
                .filter(hotel -> minRating == null || hotel.rating() >= minRating)
                .sorted(Comparator.comparingDouble(Hotel::rating).reversed())
                .toList();
    }

    public List<CabFareResponse> getCabFares(Long cityId, Long hotelId) {
        getCity(cityId);
        List<Attraction> attractions = getAttractions(cityId);
        return getHotels(cityId, null, null).stream()
                .filter(hotel -> hotelId == null || hotel.id().equals(hotelId))
                .flatMap(hotel -> attractions.stream().map(attraction -> {
                    double distance = geoService.distanceKm(hotel.latitude(), hotel.longitude(), attraction.latitude(), attraction.longitude());
                    int baseFare = Math.max(90, (int) Math.round(55 + distance * 24));
                    return new CabFareResponse(
                            hotel.id(),
                            hotel.name(),
                            attraction.id(),
                            attraction.name(),
                            distance,
                            baseFare,
                            (int) Math.round(baseFare * 1.35),
                            Math.max(85, (int) Math.round(50 + distance * 22)),
                            (int) Math.round(baseFare * 1.45),
                            Math.max(8, (int) Math.round(12 + distance * 4))
                    );
                }))
                .sorted(Comparator.comparing(CabFareResponse::hotelName).thenComparing(CabFareResponse::distanceKm))
                .toList();
    }

    public List<MapMarkerResponse> getIndiaMapMarkers() {
        return dataStore.cities().stream()
                .map(city -> new MapMarkerResponse(
                        city.getId(),
                        city.getName(),
                        city.getState(),
                        city.getRegion(),
                        city.getLatitude(),
                        city.getLongitude(),
                        city.getAverageRating(),
                        city.getPopularityScore(),
                        city.getThemes()
                ))
                .toList();
    }

    public List<NearbyPlaceResponse> findNearby(Long cityId, Double latitude, Double longitude, double radiusKm, String type) {
        City city = getCity(cityId);
        double originLatitude = latitude == null ? city.getLatitude() : latitude;
        double originLongitude = longitude == null ? city.getLongitude() : longitude;

        Stream<NearbyPlaceResponse> hotels = dataStore.hotels().stream()
                .filter(hotel -> hotel.cityId().equals(cityId))
                .map(hotel -> new NearbyPlaceResponse(hotel.id(), hotel.name(), "hotel", hotel.type(),
                        hotel.latitude(), hotel.longitude(), hotel.rating(), hotel.pricePerNight(),
                        geoService.distanceKm(originLatitude, originLongitude, hotel.latitude(), hotel.longitude())));

        Stream<NearbyPlaceResponse> attractions = dataStore.attractions().stream()
                .filter(attraction -> attraction.cityId().equals(cityId))
                .map(attraction -> new NearbyPlaceResponse(attraction.id(), attraction.name(), "attraction", attraction.category(),
                        attraction.latitude(), attraction.longitude(), attraction.rating(), attraction.entryFee(),
                        geoService.distanceKm(originLatitude, originLongitude, attraction.latitude(), attraction.longitude())));

        return Stream.concat(hotels, attractions)
                .filter(place -> type == null || place.type().equalsIgnoreCase(type))
                .filter(place -> place.distanceKm() <= radiusKm)
                .sorted(Comparator.comparingDouble(NearbyPlaceResponse::distanceKm))
                .toList();
    }

    public Map<String, Object> searchEverything(String query) {
        String normalized = normalize(query);
        List<City> cities = findCities(query, null, null, null, null);
        List<Hotel> hotels = dataStore.hotels().stream()
                .filter(hotel -> normalize(hotel.name()).contains(normalized)
                        || normalize(hotel.type()).contains(normalized)
                        || normalize(hotel.address()).contains(normalized))
                .toList();
        List<Attraction> attractions = dataStore.attractions().stream()
                .filter(attraction -> normalize(attraction.name()).contains(normalized)
                        || normalize(attraction.category()).contains(normalized)
                        || normalize(attraction.description()).contains(normalized))
                .toList();
        return Map.of("cities", cities, "hotels", hotels, "attractions", attractions);
    }

    public TripPlanResponse planTrip(TripPlanRequest request) {
        City city = getCity(request.cityId());
        List<ItineraryDay> itinerary = dataStore.baseItinerary(request.cityId()).stream()
                .limit(request.days())
                .toList();
        if (itinerary.size() < request.days()) {
            itinerary = Stream.concat(
                    itinerary.stream(),
                    Stream.iterate(itinerary.size() + 1, day -> day + 1)
                            .limit(request.days() - itinerary.size())
                            .map(day -> new ItineraryDay(day, "Flexible Exploration Day",
                                    List.of("Choose a nearby attraction from Yatra recommendations"),
                                    List.of("Try a local market or guided walk"),
                                    List.of("Relax at a top-rated food or sunset spot"),
                                    city.getEstimatedDailyBudget() / 3))
            ).toList();
        }

        int stayMultiplier = "luxury".equalsIgnoreCase(request.travelStyle()) ? 2 : 1;
        int estimatedStay = request.days() * request.travelers() * city.getEstimatedDailyBudget() / 2 * stayMultiplier;
        int foodAndLocalTravel = request.days() * request.travelers() * request.dailyBudgetPerPerson();
        int attractionFees = itinerary.stream().mapToInt(ItineraryDay::estimatedCost).sum() * request.travelers();
        return new TripPlanResponse(
                city.getId(),
                city.getName(),
                request.days(),
                request.travelers(),
                request.travelStyle() == null ? "standard" : request.travelStyle(),
                estimatedStay,
                foodAndLocalTravel,
                attractionFees,
                estimatedStay + foodAndLocalTravel + attractionFees,
                itinerary
        );
    }

    private boolean matchesText(String source, String query) {
        return query == null || query.isBlank() || normalize(source).contains(normalize(query));
    }

    private String normalize(String value) {
        return value == null ? "" : value.toLowerCase(Locale.ROOT).trim();
    }
}
