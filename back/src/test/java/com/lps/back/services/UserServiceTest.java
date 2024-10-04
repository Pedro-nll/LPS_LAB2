package com.lps.back.services;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.lps.back.dtos.ChangePasswordDTO;
import com.lps.back.exceptions.ChangePasswordException;
import com.lps.back.exceptions.ObjectNotFoundException;
import com.lps.back.models.Cliente;
import com.lps.back.models.PasswordResetToken;
import com.lps.back.models.Usuario;
import com.lps.back.repositories.PasswordTokenRepository;
import com.lps.back.repositories.UsuarioRepository;

class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordTokenRepository passwordTokenRepository;

    @Mock
    private PasswordEncoder encoder;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetById() {
        Long id = 1L;
        Usuario user = new Cliente();
        when(usuarioRepository.findById(id)).thenReturn(Optional.of(user));

        Usuario result = userService.getById(id);

        assertNotNull(result);
        assertEquals(user, result);
    }

    @Test
    void testGetByIdNotFound() {
        Long id = 1L;
        when(usuarioRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(ObjectNotFoundException.class, () -> userService.getById(id));
    }

    @Test
    void testGetByEmail() {
        String email = "test@example.com";
        Usuario user = new Cliente();
        when(usuarioRepository.findByEmail(email)).thenReturn(user);

        Usuario result = userService.getByEmail(email);

        assertNotNull(result);
        assertEquals(user, result);
    }

    @Test
    void testChangePasswordInvalidToken() {
        ChangePasswordDTO dto = new ChangePasswordDTO("test@example.com", "invalidToken", "newPassword", "newPassword");
        Usuario user = new Cliente();

        when(usuarioRepository.findByEmail(dto.email())).thenReturn(user);
        when(passwordTokenRepository.findByUserAndToken(user, dto.token())).thenReturn(null);

        assertThrows(ChangePasswordException.class, () -> userService.changePassword(dto));
    }

    @Test
    void testDeleteUserById() {
        Long id = 1L;
        Usuario user = new Cliente();
        when(usuarioRepository.findById(id)).thenReturn(Optional.of(user));

        Usuario result = userService.deleteUserById(id);

        assertNotNull(result);
        assertEquals(user, result);
        verify(usuarioRepository).delete(user);
    }

    @Test
    void testCreatePasswordResetTokenForUser() {
        Long id = 1L;
        String token = "resetToken";
        Usuario user = new Cliente();
        when(usuarioRepository.findById(id)).thenReturn(Optional.of(user));
        when(passwordTokenRepository.findByUser(user)).thenReturn(null);

        userService.createPasswordResetTokenForUser(id, token);

        verify(passwordTokenRepository).save(any(PasswordResetToken.class));
    }

    @Test
    void testFindByEmail() {
        String email = "test@example.com";
        Usuario user = new Cliente();
        when(usuarioRepository.findByEmail(email)).thenReturn(user);

        Usuario result = userService.findByEmail(email);

        assertNotNull(result);
        assertEquals(user, result);
    }
}