package com.yatra.service;

import com.yatra.dto.BookingRequest;
import com.yatra.dto.BookingResponse;
import com.yatra.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class BookingService {

    private final Map<String, BookingResponse> bookings = new ConcurrentHashMap<>();

    public BookingService() {
        // Pre-populate with initial realistic confirmed bookings
        seedInitialBookings();
    }

    public List<BookingResponse> getAllBookings() {
        return new ArrayList<>(bookings.values());
    }

    public BookingResponse getBooking(String bookingId) {
        BookingResponse booking = bookings.get(bookingId);
        if (booking == null) {
            throw new ResourceNotFoundException("Booking " + bookingId + " not found");
        }
        return booking;
    }

    public BookingResponse createBooking(BookingRequest request) {
        String bookingId = "YTR-" + ThreadLocalRandom.current().nextInt(100000, 999999);

        int travelers = request.travelers() != null ? request.travelers() : 1;
        int rooms = request.rooms() != null ? request.rooms() : 1;
        int totalAmount = request.totalAmountInr() != null && request.totalAmountInr() > 0
                ? request.totalAmountInr()
                : calculateDefaultTotal(request.bookingType(), travelers, rooms);

        int taxAmount = (int) Math.round(totalAmount * 0.12);
        int baseAmount = totalAmount - taxAmount;

        String checkIn = request.checkInDate() != null && !request.checkInDate().isBlank()
                ? request.checkInDate()
                : LocalDate.now().plusDays(7).toString();
        String checkOut = request.checkOutDate() != null && !request.checkOutDate().isBlank()
                ? request.checkOutDate()
                : LocalDate.now().plusDays(10).toString();

        BookingResponse response = new BookingResponse(
                bookingId,
                "CONFIRMED",
                request.customerName(),
                request.customerEmail(),
                request.customerPhone() != null ? request.customerPhone() : "+91 98765 43210",
                request.bookingType(),
                request.cityId(),
                request.cityName() != null ? request.cityName() : "Jaipur",
                request.itemName() != null ? request.itemName() : "Heritage Haveli Jaipur Stay",
                checkIn,
                checkOut,
                travelers,
                rooms,
                baseAmount,
                taxAmount,
                totalAmount,
                request.specialRequests() != null ? request.specialRequests() : "High floor room preferred, early check-in if available.",
                LocalDateTime.now()
        );

        bookings.put(bookingId, response);
        return response;
    }

    public BookingResponse cancelBooking(String bookingId) {
        BookingResponse existing = getBooking(bookingId);
        BookingResponse cancelled = new BookingResponse(
                existing.bookingId(),
                "CANCELLED",
                existing.customerName(),
                existing.customerEmail(),
                existing.customerPhone(),
                existing.bookingType(),
                existing.cityId(),
                existing.cityName(),
                existing.itemName(),
                existing.checkInDate(),
                existing.checkOutDate(),
                existing.travelers(),
                existing.rooms(),
                existing.baseAmountInr(),
                existing.taxAmountInr(),
                existing.totalAmountInr(),
                "Cancelled by traveler request.",
                existing.bookedAt()
        );
        bookings.put(bookingId, cancelled);
        return cancelled;
    }

    private int calculateDefaultTotal(String bookingType, int travelers, int rooms) {
        if ("cab".equalsIgnoreCase(bookingType)) {
            return 1450;
        } else if ("package".equalsIgnoreCase(bookingType)) {
            return travelers * 11500;
        }
        return rooms * 4200 * 2; // 2 nights hotel
    }

    private void seedInitialBookings() {
        bookings.put("YTR-819204", new BookingResponse(
                "YTR-819204",
                "CONFIRMED",
                "Ananya Sharma",
                "ananya.s@example.com",
                "+91 98111 22334",
                "hotel",
                1L,
                "Jaipur",
                "Heritage Haveli Jaipur (Deluxe Courtyard View)",
                LocalDate.now().plusDays(5).toString(),
                LocalDate.now().plusDays(8).toString(),
                2,
                1,
                11250,
                1350,
                12600,
                "Airport pickup requested, vegetarian breakfast",
                LocalDateTime.now().minusDays(1)
        ));

        bookings.put("YTR-635190", new BookingResponse(
                "YTR-635190",
                "CONFIRMED",
                "David Miller",
                "david.m@example.org",
                "+44 7911 123456",
                "package",
                2L,
                "Agra",
                "Taj & Mughal Heritage 2-Day Private Tour",
                LocalDate.now().plusDays(14).toString(),
                LocalDate.now().plusDays(16).toString(),
                2,
                1,
                14285,
                1715,
                16000,
                "Sunrise entry pass for Taj Mahal and English-speaking historian guide",
                LocalDateTime.now().minusHours(8)
        ));
    }
}
