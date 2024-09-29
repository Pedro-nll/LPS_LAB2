package com.lps.back.dtos.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String accessToken;
    private String userType;
    @Builder.Default
    private String tokenType = "Bearer";

    public LoginResponse(String accessToken, String userType) {
        this.accessToken = accessToken;
        this.userType = userType;
        this.tokenType = "Bearer";
    }
}