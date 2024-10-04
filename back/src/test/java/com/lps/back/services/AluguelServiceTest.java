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

import com.lps.back.dtos.AluguelDTO;
import com.lps.back.enumeration.Situacao;
import com.lps.back.models.*;
import com.lps.back.repositories.AluguelRepository;
import com.lps.back.services.*;

class AluguelServiceTest {

    @InjectMocks
    private AluguelService aluguelService;

    @Mock
    private BancoService bancoService;
    @Mock
    private AluguelRepository aluguelRepository;
    @Mock
    private AutomovelService automovelService;
    @Mock
    private ClienteService clienteService;
    @Mock
    private AgenciaService agenciaService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSave() {
        AluguelDTO aluguelDTO = mock(AluguelDTO.class);
        Automovel automovel = new Automovel();
        Cliente cliente = new Cliente();
        Agencia agencia = new Agencia();
        Banco banco = new Banco();
        Aluguel aluguel = new Aluguel();

        when(automovelService.findById(anyString())).thenReturn(automovel);
        when(clienteService.getById(anyLong())).thenReturn(cliente);
        when(agenciaService.findById(anyLong())).thenReturn(agencia);
        when(bancoService.findById(anyLong())).thenReturn(banco);
        when(aluguelDTO.toEntity(any(), any(), any(), any())).thenReturn(aluguel);
        when(bancoService.checkClienteValue(any())).thenReturn(true);

        Aluguel result = aluguelService.save(aluguelDTO);

        assertNotNull(result);
        assertEquals(Situacao.APROVADOPELOBANCO, result.getSituacao());
        verify(aluguelRepository).save(aluguel);
    }

    @Test
    void testUpdate() {
        AluguelDTO aluguelDTO = mock(AluguelDTO.class);
        Automovel automovel = new Automovel();
        Cliente cliente = new Cliente();
        Agencia agencia = new Agencia();
        Banco banco = new Banco();
        Aluguel aluguel = new Aluguel();

        when(automovelService.findById(anyString())).thenReturn(automovel);
        when(clienteService.getById(anyLong())).thenReturn(cliente);
        when(agenciaService.findById(anyLong())).thenReturn(agencia);
        when(bancoService.findById(anyLong())).thenReturn(banco);
        when(aluguelDTO.toEntity(any(), any(), any(), any())).thenReturn(aluguel);
        when(bancoService.checkClienteValue(any())).thenReturn(true);

        Aluguel result = aluguelService.update(aluguelDTO);

        assertNotNull(result);
        assertEquals(Situacao.APROVADOPELOBANCO, result.getSituacao());
        verify(aluguelRepository).save(aluguel);
    }

    @Test
    void testDelete() {
        Long id = 1L;
        aluguelService.delete(id);
        verify(aluguelRepository).deleteById(id);
    }

    @Test
    void testFindById() {
        Long id = 1L;
        Aluguel aluguel = new Aluguel();
        when(aluguelRepository.findById(id)).thenReturn(Optional.of(aluguel));

        Aluguel result = aluguelService.findById(id);

        assertNotNull(result);
        assertEquals(aluguel, result);
    }

    @Test
    void testFindAll() {
        List<Aluguel> alugueis = Arrays.asList(new Aluguel(), new Aluguel());
        when(aluguelRepository.findAll()).thenReturn(alugueis);

        List<Aluguel> result = aluguelService.findAll();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(alugueis, result);
    }

    @Test
    void testFindByAutomovelMatricula() {
        String matricula = "ABC123";
        Automovel automovel = new Automovel();
        List<Aluguel> alugueis = Arrays.asList(new Aluguel(), new Aluguel());

        when(automovelService.findById(matricula)).thenReturn(automovel);
        when(aluguelRepository.findByAutomovel(automovel)).thenReturn(alugueis);

        List<Aluguel> result = aluguelService.findByAutomovelMatricula(matricula);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(alugueis, result);
    }

    @Test
    void testFindByClienteId() {
        Long id = 1L;
        Cliente cliente = new Cliente();
        List<Aluguel> alugueis = Arrays.asList(new Aluguel(), new Aluguel());

        when(clienteService.getById(id)).thenReturn(cliente);
        when(aluguelRepository.findByCliente(cliente)).thenReturn(alugueis);

        List<Aluguel> result = aluguelService.findByClienteId(id);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(alugueis, result);
    }

    @Test
    void testFindByAgenciaId() {
        Long id = 1L;
        Agencia agencia = new Agencia();
        List<Aluguel> alugueis = Arrays.asList(new Aluguel(), new Aluguel());

        when(agenciaService.findById(id)).thenReturn(agencia);
        when(aluguelRepository.findByAgencia(agencia)).thenReturn(alugueis);

        List<Aluguel> result = aluguelService.findByAgenciaId(id);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(alugueis, result);
    }

    @Test
    void testChangeState() {
        Aluguel aluguel = new Aluguel();
        Situacao newState = Situacao.APROVADO;

        aluguelService.changeState(aluguel, newState);

        assertEquals(newState, aluguel.getSituacao());
        verify(aluguelRepository).save(aluguel);
    }

    @Test
    void testChangeStateById() {
        Long id = 1L;
        Aluguel aluguel = new Aluguel();
        Situacao newState = Situacao.APROVADO;

        when(aluguelRepository.findById(id)).thenReturn(Optional.of(aluguel));

        aluguelService.changeState(id, newState);

        assertEquals(newState, aluguel.getSituacao());
        verify(aluguelRepository).save(aluguel);
    }
}