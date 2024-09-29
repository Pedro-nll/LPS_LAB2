package com.lps.back.services.interfaces;

import com.lps.back.dtos.ChangePasswordDTO;
import com.lps.back.models.Usuario;

public interface IUserService {
    Usuario findByEmail(String email);

    void createPasswordResetTokenForUser(Long id, String token);

    Usuario deleteUserById(Long id);

    Usuario save(Usuario user);

    void changePassword(ChangePasswordDTO changePasswordDTO);

    Usuario getByEmail(String email);

    Usuario getById(Long id);
}
