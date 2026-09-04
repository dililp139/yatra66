package com.yatra.dto;

import java.util.Map;

public record CurrencyRatesResponse(
        String baseCurrency,
        String lastUpdated,
        Map<String, Double> rates,
        Map<String, String> currencySymbols,
        boolean isLiveExternalData
) {}
