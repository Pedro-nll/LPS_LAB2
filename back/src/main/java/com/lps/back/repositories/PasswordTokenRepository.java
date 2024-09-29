
package com.lps.back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lps.back.models.PasswordResetToken;
import com.lps.back.models.Usuario;

@Repository
public interface PasswordTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
    PasswordResetToken findByUserAndToken(Usuario User, String token);

    PasswordResetToken findByUser(Usuario User);
}