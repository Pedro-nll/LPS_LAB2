package com.lps.back.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.lps.back.models.Endereco;
import com.lps.back.repositories.EnderecoRepository;

class EnderecoServiceTest {

    @InjectMocks
    private EnderecoService enderecoService;

    @Mock
    private EnderecoRepository enderecoRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSave() {
        Endereco endereco = new Endereco();
        when(enderecoRepository.save(endereco)).thenReturn(endereco);

        Endereco result = enderecoService.save(endereco);

        assertNotNull(result);
        verify(enderecoRepository).save(endereco);
    }

    @Test
    void testUpdate() {
        Endereco endereco = new Endereco();
        when(enderecoRepository.save(endereco)).thenReturn(endereco);

        Endereco result = enderecoService.update(endereco);

        assertNotNull(result);
        verify(enderecoRepository).save(endereco);
    }

    @Test
    void testDelete() {
        Long id = 1L;
        enderecoService.delete(id);
        verify(enderecoRepository).deleteById(id);
    }

    @Test
    void testGetById() {
        Long id = 1L;
        Endereco endereco = new Endereco();
        when(enderecoRepository.findById(id)).thenReturn(Optional.of(endereco));

        Endereco result = enderecoService.getById(id);

        assertNotNull(result);
        assertEquals(endereco, result);
    }

    @Test
    void testGetByIdNotFound() {
        Long id = 1L;
        when(enderecoRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(java.util.NoSuchElementException.class, () -> {
            enderecoService.getById(id);
        });
    }
}