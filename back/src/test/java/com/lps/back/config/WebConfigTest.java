package com.lps.back.config;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.lps.back.repositories.*;

public class WebConfigTest {

    @InjectMocks
    private WebConfig webConfig;

    @Mock
    private AgenciaRepository agenciaRepository;

    @Mock
    private AutomovelRepository automovelRepository;

    @Mock
    private AluguelRepository aluguelRepository;

    @Mock
    private ClienteRepository clienteRepository;

    @Mock
    private BancoRepository bancoRepository;

    @Mock
    private PasswordEncoder encoder;

    @Mock
    private CorsRegistry corsRegistry;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRunWithTestProfile() throws Exception {
        ReflectionTestUtils.setField(webConfig, "activeProfile", "test");

        webConfig.run();

        verify(agenciaRepository, times(2)).save(any());
        verify(bancoRepository, times(2)).save(any());
        verify(clienteRepository).save(any());
        verify(automovelRepository).save(any());
        verify(aluguelRepository).save(any());
    }

    @Test
    void testRunWithNonTestProfile() throws Exception {
        ReflectionTestUtils.setField(webConfig, "activeProfile", "production");

        webConfig.run();

        verify(agenciaRepository, never()).save(any());
        verify(bancoRepository, never()).save(any());
        verify(clienteRepository, never()).save(any());
        verify(automovelRepository, never()).save(any());
        verify(aluguelRepository, never()).save(any());
    }

    @Test
    void testGetBcrypt() {
        PasswordEncoder result = webConfig.getBcrypt();
        assertNotNull(result);
        assertTrue(result instanceof PasswordEncoder);
    }
}