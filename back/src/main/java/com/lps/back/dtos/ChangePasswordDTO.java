package com.lps.back.dtos;

public record ChangePasswordDTO(String token, String email, String novaSenha, String confirmacaoNovaSenha) {
}
