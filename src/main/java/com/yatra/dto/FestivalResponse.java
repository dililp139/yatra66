package com.yatra.dto;

import java.util.List;

public record FestivalResponse(
        String name,
        String localName,
        String date,
        String category,
        String month,
        String culturalSignificance,
        List<String> topCitiesToCelebrate,
        String travelAdvice,
        boolean isNationalHoliday
) {}
