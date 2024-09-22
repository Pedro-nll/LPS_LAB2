package com.lps.back.dtos.user;

import com.lps.back.utils.UsuarioTypesEnum;

public record UserUpdateDTO(Long id, String name, String email, UsuarioTypesEnum userType) {
}
