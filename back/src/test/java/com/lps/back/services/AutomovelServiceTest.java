package com.lps.back.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.MockitoAnnotations;

import com.lps.back.dtos.AutomovelRecord;
import com.lps.back.models.Agencia;
import com.lps.back.models.Automovel;
import com.lps.back.repositories.AutomovelRepository;

class AutomovelServiceTest {

    @InjectMocks
    private AutomovelService automovelService;

    @Mock
    private AgenciaService agenciaService;

    @Mock
    private AutomovelRepository automovelRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSave() {
        // Create a mock AutomovelRecord with specific return values
        AutomovelRecord automovelRecord = mock(AutomovelRecord.class);
        when(automovelRecord.AgenciaId()).thenReturn(1L);
        when(automovelRecord.matricula()).thenReturn("ABC123");
        when(automovelRecord.ano()).thenReturn(2023);
        when(automovelRecord.marca()).thenReturn("TestMarca");
        when(automovelRecord.modelo()).thenReturn("TestModelo");
        when(automovelRecord.placa()).thenReturn("TEST1234");
        when(automovelRecord.alugado()).thenReturn(false);
        when(automovelRecord.imageUrl()).thenReturn("http://example.com/image.jpg");

        Agencia agencia = new Agencia();
        agencia.setId(1L);

        Automovel automovel = new Automovel();
        automovel.setMatricula("ABC123");
        automovel.setAgencia(agencia);

        when(agenciaService.findById(1L)).thenReturn(agencia);
        when(automovelRepository.save(any(Automovel.class))).thenReturn(automovel);

        // We need to mock the static method fromRecord
        try (MockedStatic<AutomovelRecord> mockedStatic = mockStatic(AutomovelRecord.class)) {
            mockedStatic.when(() -> AutomovelRecord.fromRecord(any(AutomovelRecord.class), any(Agencia.class)))
                    .thenReturn(automovel);

            Automovel result = automovelService.save(automovelRecord);

            assertNotNull(result);
            assertEquals("ABC123", result.getMatricula());
            assertEquals(agencia, result.getAgencia());
            verify(automovelRepository).save(any(Automovel.class));
        }
    }

    @Test
    void testUpdate() {
        // Create a mock AutomovelRecord with specific return values
        AutomovelRecord automovelRecord = mock(AutomovelRecord.class);
        when(automovelRecord.AgenciaId()).thenReturn(1L);
        when(automovelRecord.matricula()).thenReturn("ABC123");
        when(automovelRecord.ano()).thenReturn(2023);
        when(automovelRecord.marca()).thenReturn("TestMarca");
        when(automovelRecord.modelo()).thenReturn("TestModelo");
        when(automovelRecord.placa()).thenReturn("TEST1234");
        when(automovelRecord.alugado()).thenReturn(false);
        when(automovelRecord.imageUrl()).thenReturn("http://example.com/image.jpg");

        Agencia agencia = new Agencia();
        agencia.setId(1L);

        Automovel automovelInBase = new Automovel();
        automovelInBase.setMatricula("ABC123");
        automovelInBase.setAluguel(new ArrayList<>());

        Automovel updatedAutomovel = new Automovel();
        updatedAutomovel.setMatricula("ABC123");
        updatedAutomovel.setAgencia(agencia);

        when(agenciaService.findById(1L)).thenReturn(agencia);
        when(automovelRepository.findById("ABC123")).thenReturn(Optional.of(automovelInBase));
        when(automovelRepository.save(any(Automovel.class))).thenReturn(updatedAutomovel);

        // We need to mock the static method fromRecord
        try (MockedStatic<AutomovelRecord> mockedStatic = mockStatic(AutomovelRecord.class)) {
            mockedStatic.when(() -> AutomovelRecord.fromRecord(any(AutomovelRecord.class), any(Agencia.class)))
                    .thenReturn(updatedAutomovel);

            Automovel result = automovelService.update(automovelRecord);

            assertNotNull(result);
            assertEquals("ABC123", result.getMatricula());
            assertEquals(agencia, result.getAgencia());
            assertEquals(automovelInBase.getAluguel(), result.getAluguel());
            verify(automovelRepository).save(any(Automovel.class));
        }
    }

    @Test
    void testDelete() {
        String matricula = "ABC123";
        automovelService.delete(matricula);
        verify(automovelRepository).deleteById(matricula);
    }

    @Test
    void testFindById() {
        String matricula = "ABC123";
        Automovel automovel = new Automovel();
        when(automovelRepository.findById(matricula)).thenReturn(Optional.of(automovel));

        Automovel result = automovelService.findById(matricula);

        assertNotNull(result);
        assertEquals(automovel, result);
    }

    @Test
    void testFindAll() {
        List<Automovel> automoveis = Arrays.asList(new Automovel(), new Automovel());
        when(automovelRepository.findAll()).thenReturn(automoveis);

        List<Automovel> result = automovelService.findAll();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(automoveis, result);
    }

    @Test
    void testFindByAgenciaId() {
        Long agenciaId = 1L;
        List<Automovel> automoveis = Arrays.asList(new Automovel(), new Automovel());
        when(automovelRepository.findByAgenciaId(agenciaId)).thenReturn(automoveis);

        List<Automovel> result = automovelService.findByAgenciaId(agenciaId);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(automoveis, result);
    }
}