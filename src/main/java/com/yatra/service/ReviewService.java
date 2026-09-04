package com.yatra.service;

import com.yatra.dto.ReviewRequest;
import com.yatra.model.City;
import com.yatra.model.Review;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ReviewService {

    private final TourismDataStore dataStore;
    private final List<Review> allReviews = new CopyOnWriteArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong(100);

    public ReviewService(TourismDataStore dataStore) {
        this.dataStore = dataStore;
        // Load initial reviews from data store
        allReviews.addAll(dataStore.reviews());
    }

    public List<Review> getReviewsForCity(Long cityId) {
        return allReviews.stream()
                .filter(review -> cityId == null || review.cityId().equals(cityId))
                .toList();
    }

    public Review addReview(ReviewRequest request) {
        String month = request.travelMonth() != null && !request.travelMonth().isBlank()
                ? request.travelMonth()
                : LocalDate.now().getMonth().getDisplayName(TextStyle.FULL, Locale.ENGLISH);

        Review newReview = new Review(
                idGenerator.incrementAndGet(),
                request.cityId(),
                request.travelerName().trim(),
                request.rating(),
                request.comment().trim(),
                month
        );

        allReviews.add(0, newReview);

        // Update city's average rating dynamically
        updateCityRating(request.cityId());

        return newReview;
    }

    private void updateCityRating(Long cityId) {
        List<Review> cityReviews = allReviews.stream()
                .filter(r -> r.cityId().equals(cityId))
                .toList();

        if (!cityReviews.isEmpty()) {
            double avg = cityReviews.stream().mapToInt(Review::rating).average().orElse(4.5);
            double rounded = Math.round(avg * 10.0) / 10.0;

            dataStore.cities().stream()
                    .filter(c -> c.getId().equals(cityId))
                    .findFirst()
                    .ifPresent(c -> c.setAverageRating(rounded));
        }
    }
}
