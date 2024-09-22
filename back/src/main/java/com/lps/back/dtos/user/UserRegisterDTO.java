package com.lps.back.dtos.user;

import com.lps.back.utils.UsuarioTypesEnum;

public record UserRegisterDTO(String name, String email, UsuarioTypesEnum userType) {

}
