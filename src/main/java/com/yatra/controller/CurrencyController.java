package com.yatra.controller;

import com.yatra.dto.CurrencyRatesResponse;
import com.yatra.service.external.ExternalCurrencyService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CurrencyController {

    private final ExternalCurrencyService currencyService;

    public CurrencyController(ExternalCurrencyService currencyService) {
        this.currencyService = currencyService;
    }

    @GetMapping("/api/currency/rates")
    public CurrencyRatesResponse getRates() {
        return currencyService.getExchangeRates();
    }
}
