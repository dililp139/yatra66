package com.yatra.service;

import com.yatra.dto.BookingRequest;
import com.yatra.dto.BookingResponse;
import com.yatra.dto.ReviewRequest;
import com.yatra.dto.TransitRouteResponse;
import com.yatra.dto.WeatherResponse;
import com.yatra.dto.WikiSummaryResponse;
import com.yatra.model.City;
import com.yatra.service.external.ExternalCurrencyService;
import com.yatra.service.external.ExternalFestivalService;
import com.yatra.service.external.ExternalWeatherService;
import com.yatra.service.external.ExternalWikiService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class NewFeaturesServiceTests {

    @Autowired
    private ExternalWeatherService weatherService;

    @Autowired
    private ExternalWikiService wikiService;

    @Autowired
    private ExternalFestivalService festivalService;

    @Autowired
    private ExternalCurrencyService currencyService;

    @Autowired
    private TransitRouteService transitRouteService;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private TourismService tourismService;

    @Test
    void testWeatherServiceReturnsValidForecast() {
        City jaipur = tourismService.getCity(1L);
        WeatherResponse weather = weatherService.getWeatherForCity(jaipur);

        assertThat(weather).isNotNull();
        assertThat(weather.cityName()).isEqualTo("Jaipur");
        assertThat(weather.currentTemperature()).isBetween(-10.0, 55.0);
        assertThat(weather.weatherCondition()).isNotBlank();
        assertThat(weather.dailyForecasts()).isNotEmpty();
    }

    @Test
    void testWikiServiceReturnsSummary() {
        WikiSummaryResponse summary = wikiService.getWikiSummary("Jaipur");

        assertThat(summary).isNotNull();
        assertThat(summary.title()).isNotBlank();
        assertThat(summary.extract()).isNotBlank();
        assertThat(summary.wikipediaUrl()).contains("wikipedia.org");
    }

    @Test
    void testFestivalServiceReturnsIndianCelebrations() {
        var festivals = festivalService.getIndianFestivals(2026);

        assertThat(festivals).isNotEmpty();
        assertThat(festivals).anyMatch(f -> f.name().toLowerCase().contains("diwali") || f.name().toLowerCase().contains("deepavali"));
        assertThat(festivals).anyMatch(f -> f.name().toLowerCase().contains("holi"));
    }

    @Test
    void testCurrencyServiceReturnsRates() {
        var currencyData = currencyService.getExchangeRates();

        assertThat(currencyData).isNotNull();
        assertThat(currencyData.baseCurrency()).isEqualTo("INR");
        assertThat(currencyData.rates()).containsKey("USD");
        assertThat(currencyData.rates().get("USD")).isPositive();
    }

    @Test
    void testTransitRouteCalculation() {
        TransitRouteResponse route = transitRouteService.calculateRoute(1L, 2L); // Jaipur to Agra

        assertThat(route).isNotNull();
        assertThat(route.originCityName()).isEqualTo("Jaipur");
        assertThat(route.destinationCityName()).isEqualTo("Agra");
        assertThat(route.options()).isNotEmpty();
        assertThat(route.options()).anyMatch(opt -> opt.mode().equals("TRAIN"));
    }

    @Test
    void testBookingLifecycle() {
        BookingRequest request = new BookingRequest(
                "Pooja Patel",
                "pooja@example.com",
                "+91 99999 88888",
                "hotel",
                1L,
                "Jaipur",
                "Heritage Haveli Jaipur",
                "2026-10-10",
                "2026-10-13",
                2,
                1,
                12600,
                "Early check-in"
        );

        BookingResponse created = bookingService.createBooking(request);
        assertThat(created.bookingId()).startsWith("YTR-");
        assertThat(created.status()).isEqualTo("CONFIRMED");
        assertThat(created.totalAmountInr()).isEqualTo(12600);

        BookingResponse cancelled = bookingService.cancelBooking(created.bookingId());
        assertThat(cancelled.status()).isEqualTo("CANCELLED");
    }

    @Test
    void testReviewSubmissionAndRatingUpdate() {
        ReviewRequest request = new ReviewRequest(
                1L,
                "Ramesh Kumar",
                5,
                "Mesmerizing palaces and hearty Rajasthani thali!",
                "February"
        );

        var review = reviewService.addReview(request);
        assertThat(review.travelerName()).isEqualTo("Ramesh Kumar");
        assertThat(reviewService.getReviewsForCity(1L)).contains(review);
    }

    @Autowired
    private LiveCabService liveCabService;

    @Test
    void testLiveCabEstimates() {
        var response = liveCabService.getLiveCabEstimates(
                "Heritage Haveli Jaipur", 26.9225, 75.8199,
                "Amber Fort", 26.9855, 75.8513
        );

        assertThat(response).isNotNull();
        assertThat(response.distanceKm()).isPositive();
        assertThat(response.olaOptions()).isNotEmpty();
        assertThat(response.uberOptions()).isNotEmpty();
        assertThat(response.olaOptions().get(0).directBookingUrl()).contains("book.olacabs.com");
        assertThat(response.uberOptions().get(0).directBookingUrl()).contains("m.uber.com");
    }

    @Autowired
    private HotelComparisonService hotelComparisonService;

    @Test
    void testHotelPriceComparison() {
        var result = hotelComparisonService.compareHotelPrices("Heritage Haveli Jaipur", "Jaipur", 4200, 4.6);
        assertThat(result).isNotNull();
        assertThat(result.hotelName()).isEqualTo("Heritage Haveli Jaipur");
        assertThat(result.platformDeals()).hasSize(4);
        assertThat(result.platformDeals()).anyMatch(d -> d.platformName().equals("MakeMyTrip"));
        assertThat(result.platformDeals()).anyMatch(d -> d.platformName().equals("Agoda"));
        assertThat(result.platformDeals()).anyMatch(d -> d.platformName().equals("Booking.com"));
        assertThat(result.platformDeals()).anyMatch(d -> d.platformName().equals("Yatra Direct"));
    }
}
