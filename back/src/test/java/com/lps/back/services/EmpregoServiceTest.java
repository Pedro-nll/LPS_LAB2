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

import com.lps.back.models.Emprego;
import com.lps.back.repositories.EmpregoRepository;

class EmpregoServiceTest {

    @InjectMocks
    private EmpregoService empregoService;

    @Mock
    private EmpregoRepository empregoRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSave() {
        Emprego emprego = new Emprego();
        when(empregoRepository.save(emprego)).thenReturn(emprego);

        Emprego result = empregoService.save(emprego);

        assertNotNull(result);
        verify(empregoRepository).save(emprego);
    }

    @Test
    void testUpdate() {
        Emprego emprego = new Emprego();
        when(empregoRepository.save(emprego)).thenReturn(emprego);

        Emprego result = empregoService.update(emprego);

        assertNotNull(result);
        verify(empregoRepository).save(emprego);
    }

    @Test
    void testDelete() {
        Long id = 1L;
        empregoService.delete(id);
        verify(empregoRepository).deleteById(id);
    }

    @Test
    void testGetById() {
        Long id = 1L;
        Emprego emprego = new Emprego();
        when(empregoRepository.findById(id)).thenReturn(Optional.of(emprego));

        Emprego result = empregoService.getById(id);

        assertNotNull(result);
        assertEquals(emprego, result);
    }

    @Test
    void testSaveAll() {
        List<Emprego> empregos = Arrays.asList(new Emprego(), new Emprego());
        empregoService.saveAll(empregos);
        verify(empregoRepository).saveAll(empregos);
    }
}