package com.yatra.model;

public class City {

    private Long id;

    private String name;
    private String state;
    private String region;
    private String heroImage;
    private double latitude;
    private double longitude;
    private String description;
    private String bestSeason;
    private int popularityScore;
    private double averageRating;
    private int estimatedDailyBudget;
    private java.util.List<String> themes;

    public City() {
    }

    public City(Long id, String name, String state,
                String region, String heroImage, double latitude, double longitude,
                String description, String bestSeason, int popularityScore,
                double averageRating, int estimatedDailyBudget, java.util.List<String> themes) {

        this.id = id;
        this.name = name;
        this.state = state;
        this.region = region;
        this.heroImage = heroImage;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
        this.bestSeason = bestSeason;
        this.popularityScore = popularityScore;
        this.averageRating = averageRating;
        this.estimatedDailyBudget = estimatedDailyBudget;
        this.themes = themes;
    }

    // Getters

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getState() {
        return state;
    }

    public String getRegion() {
        return region;
    }

    public String getHeroImage() {
        return heroImage;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public String getDescription() {
        return description;
    }

    public String getBestSeason() {
        return bestSeason;
    }

    public int getPopularityScore() {
        return popularityScore;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public int getEstimatedDailyBudget() {
        return estimatedDailyBudget;
    }

    public java.util.List<String> getThemes() {
        return themes;
    }

    // Setters

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public void setHeroImage(String heroImage) {
        this.heroImage = heroImage;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setBestSeason(String bestSeason) {
        this.bestSeason = bestSeason;
    }

    public void setPopularityScore(int popularityScore) {
        this.popularityScore = popularityScore;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public void setEstimatedDailyBudget(int estimatedDailyBudget) {
        this.estimatedDailyBudget = estimatedDailyBudget;
    }

    public void setThemes(java.util.List<String> themes) {
        this.themes = themes;
    }
}
