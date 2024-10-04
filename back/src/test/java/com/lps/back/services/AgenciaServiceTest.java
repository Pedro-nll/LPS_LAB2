package com.lps.back.services;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.lps.back.models.Agencia;
import com.lps.back.repositories.AgenciaRepository;

class AgenciaServiceTest {

    @InjectMocks
    private AgenciaService agenciaService;

    @Mock
    private AgenciaRepository agenciaRepository;

    @Mock
    private PasswordEncoder encoder;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetBcrypt() {
        PasswordEncoder result = agenciaService.getBcrypt();
        assertNotNull(result);
    }

    @Test
    void testSave() {
        Agencia agencia = new Agencia();
        agencia.setPassword("password");

        when(encoder.encode("password")).thenReturn("encodedPassword");
        when(agenciaRepository.save(any(Agencia.class))).thenReturn(agencia);

        Agencia result = agenciaService.save(agencia);

        assertNotNull(result);
        assertNotEquals("encodedPassword", result.getPassword());
        verify(agenciaRepository).save(agencia);
    }

    @Test
    void testUpdate() {
        Agencia agencia = new Agencia();
        agencia.setPassword("newPassword");

        when(encoder.encode("newPassword")).thenReturn("newEncodedPassword");
        when(agenciaRepository.save(any(Agencia.class))).thenReturn(agencia);

        Agencia result = agenciaService.update(agencia);

        assertNotNull(result);
        assertNotEquals("newEncodedPassword", result.getPassword());
        verify(agenciaRepository).save(agencia);
    }

    @Test
    void testDelete() {
        Long id = 1L;
        agenciaService.delete(id);
        verify(agenciaRepository).deleteById(id);
    }

    @Test
    void testFindById() {
        Long id = 1L;
        Agencia agencia = new Agencia();
        when(agenciaRepository.findById(id)).thenReturn(Optional.of(agencia));

        Agencia result = agenciaService.findById(id);

        assertNotNull(result);
        assertEquals(agencia, result);
    }

    @Test
    void testFindByIdNotFound() {
        Long id = 1L;
        when(agenciaRepository.findById(id)).thenReturn(Optional.empty());

        Agencia result = agenciaService.findById(id);

        assertNull(result);
    }

    @Test
    void testFindAll() {
        List<Agencia> agencias = Arrays.asList(new Agencia(), new Agencia());
        when(agenciaRepository.findAll()).thenReturn(agencias);

        List<Agencia> result = agenciaService.findAll();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(agencias, result);
    }
}