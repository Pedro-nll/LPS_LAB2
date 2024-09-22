package com.lps.back.dtos.user;

import com.lps.back.utils.UsuarioTypesEnum;

public record UserReturnLoginDTO(Long id, String name, String email, UsuarioTypesEnum userType) {

}
