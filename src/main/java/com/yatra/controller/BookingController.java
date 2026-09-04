package com.yatra.controller;

import com.yatra.dto.BookingRequest;
import com.yatra.dto.BookingResponse;
import com.yatra.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/api/bookings")
    public List<BookingResponse> getBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/api/bookings/{bookingId}")
    public BookingResponse getBooking(@PathVariable String bookingId) {
        return bookingService.getBooking(bookingId);
    }

    @PostMapping("/api/bookings")
    @ResponseStatus(HttpStatus.CREATED)
    public BookingResponse createBooking(@Valid @RequestBody BookingRequest request) {
        return bookingService.createBooking(request);
    }

    @DeleteMapping("/api/bookings/{bookingId}")
    public BookingResponse cancelBooking(@PathVariable String bookingId) {
        return bookingService.cancelBooking(bookingId);
    }
}
