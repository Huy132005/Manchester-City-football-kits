package com.huydq2005.jersey_shop.payload.response;

public class AuthResponse {

    private String accessToken;
    private String refreshToken;
    private long timeToLive;

    public AuthResponse(String accessToken, String refreshToken, long timeToLive) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.timeToLive = timeToLive;
    }

    public AuthResponse() {
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public long getTimeToLive() {
        return timeToLive;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void setTimeToLive(long timeToLive) {
        this.timeToLive = timeToLive;
    }
}