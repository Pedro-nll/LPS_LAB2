package com.lps.back.dtos.user;

public record UserRecoverPasswordDTO(String email, String password, String token) {

}
