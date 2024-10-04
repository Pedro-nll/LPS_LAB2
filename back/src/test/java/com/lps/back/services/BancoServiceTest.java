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

import com.lps.back.models.Aluguel;
import com.lps.back.models.Banco;
import com.lps.back.models.Cliente;
import com.lps.back.repositories.BancoRepository;

class BancoServiceTest {

    @InjectMocks
    private BancoService bancoService;

    @Mock
    private BancoRepository bancoRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSave() {
        Banco banco = new Banco();
        bancoService.save(banco);
        verify(bancoRepository).save(banco);
    }

    @Test
    void testUpdate() {
        Banco banco = new Banco();
        bancoService.update(banco);
        verify(bancoRepository).save(banco);
    }

    @Test
    void testDelete() {
        Long id = 1L;
        bancoService.delete(id);
        verify(bancoRepository).deleteById(id);
    }

    @Test
    void testFindById() {
        Long id = 1L;
        Banco banco = new Banco();
        when(bancoRepository.findById(id)).thenReturn(Optional.of(banco));

        Banco result = bancoService.findById(id);

        assertNotNull(result);
        assertEquals(banco, result);
    }

    @Test
    void testFindAll() {
        List<Banco> bancos = Arrays.asList(new Banco(), new Banco());
        when(bancoRepository.findAll()).thenReturn(bancos);

        List<Banco> result = bancoService.findAll();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(bancos, result);
    }

    @Test
    void testCheckClienteValue_Approved() {
        Aluguel aluguel = new Aluguel();
        aluguel.setValorMensal(1000.0);

        Cliente cliente = mock(Cliente.class);
        when(cliente.getSalario()).thenReturn(2000.0);

        aluguel.setCliente(cliente);

        boolean result = bancoService.checkClienteValue(aluguel);

        assertTrue(result);
    }

    @Test
    void testCheckClienteValue_Rejected() {
        Aluguel aluguel = new Aluguel();
        aluguel.setValorMensal(1500.0);

        Cliente cliente = mock(Cliente.class);
        when(cliente.getSalario()).thenReturn(2000.0);

        aluguel.setCliente(cliente);

        boolean result = bancoService.checkClienteValue(aluguel);

        assertFalse(result);
    }
}