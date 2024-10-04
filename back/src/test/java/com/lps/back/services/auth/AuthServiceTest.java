package com.lps.back.services.auth;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Collection;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.lps.back.models.Agencia;
import com.lps.back.models.Cliente;
import com.lps.back.models.Usuario;
import com.lps.back.repositories.UsuarioRepository;

class AuthServiceTest {

    @InjectMocks
    private AuthService authService;

    @Mock
    private UsuarioRepository usuarioRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLoadUserByUsername_Cliente() {
        String email = "cliente@example.com";
        Cliente cliente = new Cliente();
        cliente.setEmail(email);
        cliente.setPassword("password");

        when(usuarioRepository.findByEmail(email)).thenReturn(cliente);

        UserDetails userDetails = authService.loadUserByUsername(email);

        assertNotNull(userDetails);
        assertEquals(email, userDetails.getUsername());
        assertEquals("password", userDetails.getPassword());
        assertTrue(userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("isCliente")));
    }

    @Test
    void testLoadUserByUsername_Agencia() {
        String email = "agencia@example.com";
        Agencia agencia = new Agencia();
        agencia.setEmail(email);
        agencia.setPassword("password");

        when(usuarioRepository.findByEmail(email)).thenReturn(agencia);

        UserDetails userDetails = authService.loadUserByUsername(email);

        assertNotNull(userDetails);
        assertEquals(email, userDetails.getUsername());
        assertEquals("password", userDetails.getPassword());
        assertTrue(userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("isAgencia")));
    }

    @Test
    void testLoadUserByUsername_OtherUsuario() {
        String email = "other@example.com";
        Usuario usuario = new Usuario() {
            @Override
            public Long getId() {
                return null;
            }
        };
        usuario.setEmail(email);
        usuario.setPassword("password");

        when(usuarioRepository.findByEmail(email)).thenReturn(usuario);

        UserDetails userDetails = authService.loadUserByUsername(email);

        assertNotNull(userDetails);
        assertEquals(email, userDetails.getUsername());
        assertEquals("password", userDetails.getPassword());
        assertTrue(userDetails.getAuthorities().isEmpty());
    }

    @Test
    void testLoadUserByUsername_UserNotFound() {
        String email = "nonexistent@example.com";

        when(usuarioRepository.findByEmail(email)).thenReturn(null);

        assertThrows(UsernameNotFoundException.class, () -> {
            authService.loadUserByUsername(email);
        });
    }
}