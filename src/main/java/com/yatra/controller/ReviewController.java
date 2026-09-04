package com.yatra.controller;

import com.yatra.dto.ReviewRequest;
import com.yatra.model.Review;
import com.yatra.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/api/reviews")
    public List<Review> getReviews(@RequestParam(required = false) Long cityId) {
        return reviewService.getReviewsForCity(cityId);
    }

    @PostMapping("/api/reviews")
    @ResponseStatus(HttpStatus.CREATED)
    public Review submitReview(@Valid @RequestBody ReviewRequest request) {
        return reviewService.addReview(request);
    }
}
