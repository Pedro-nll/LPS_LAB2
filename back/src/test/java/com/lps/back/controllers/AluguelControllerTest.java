package com.lps.back.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lps.back.dtos.AluguelDTO;
import com.lps.back.enumeration.Situacao;
import com.lps.back.models.Aluguel;
import com.lps.back.models.Banco;
import com.lps.back.models.Cliente;
import com.lps.back.services.AluguelService;
import com.lps.back.services.auth.AuthService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class AluguelControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AluguelService aluguelService;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    private Aluguel aluguel;
    private AluguelDTO aluguelDTO;

    @BeforeEach
    void setUp() {
        aluguel = new Aluguel();
        aluguel.setId(1L);
        aluguel.setValorMensal(1000.0);
        aluguel.setValorPendente(1000.0);
        aluguel.setAtrasado(false);
        aluguel.setAtivo(true);
        aluguel.setTaxaJuros(0.1);
        aluguel.setSituacao(Situacao.PENDENTE);

        Banco mockBanco = new Banco();
        mockBanco.setId(1L);
        Cliente mockCliente = new Cliente();
        mockCliente.setId(1L);

        aluguelDTO = new AluguelDTO(1L, 200.0, 200.0, false, false, 10.0, "true", 1L, 1L, 1L);
    }

    @Test
    void testFindAll() throws Exception {
        List<Aluguel> alugueis = Arrays.asList(aluguel, new Aluguel());
        when(aluguelService.findAll()).thenReturn(alugueis);

        mockMvc.perform(get("/aluguel/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[1]").exists());
    }

    @Test
    void testFindByClienteId() throws Exception {
        List<Aluguel> alugueis = Arrays.asList(aluguel);
        when(aluguelService.findByClienteId(1L)).thenReturn(alugueis);

        mockMvc.perform(get("/aluguel/findByClienteId/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1));
    }

    @Test
    void testFindByAutomovelId() throws Exception {
        List<Aluguel> alugueis = Arrays.asList(aluguel);
        when(aluguelService.findByAutomovelMatricula("ABC123")).thenReturn(alugueis);

        mockMvc.perform(get("/aluguel/findByAutomovelId/ABC123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1));
    }

    @Test
    void testFindByAgenciaId() throws Exception {
        List<Aluguel> alugueis = Arrays.asList(aluguel);
        when(aluguelService.findByAgenciaId(1L)).thenReturn(alugueis);

        mockMvc.perform(get("/aluguel/findByAgenciaId/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1));
    }

    @Test
    void testFindById() throws Exception {
        when(aluguelService.findById(1L)).thenReturn(aluguel);

        mockMvc.perform(get("/aluguel/findById/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void testSave() throws Exception {
        when(aluguelService.save(any(AluguelDTO.class))).thenReturn(aluguel);

        mockMvc.perform(post("/aluguel/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(aluguelDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void testUpdate() throws Exception {
        when(aluguelService.update(any(AluguelDTO.class))).thenReturn(aluguel);

        mockMvc.perform(put("/aluguel/update/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(aluguelDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void testAcceptAluguel() throws Exception {
        doNothing().when(aluguelService).changeState(1L, Situacao.APROVADO);

        mockMvc.perform(post("/aluguel/acceptAluguel/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.tittle").value("Aluguel Aceito"))
                .andExpect(jsonPath("$.message").value("O aluguel foi aceito com sucesso!"));
    }

    @Test
    void testRecAluguel() throws Exception {
        doNothing().when(aluguelService).changeState(1L, Situacao.RECUSADOPELAAGENCIA);

        mockMvc.perform(post("/aluguel/recAluguel/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.tittle").value("Aluguel Recusado"))
                .andExpect(jsonPath("$.message").value("O aluguel foi recusado com sucesso!"));
    }

    @Test
    void testDelete() throws Exception {
        doNothing().when(aluguelService).delete(1L);

        mockMvc.perform(delete("/aluguel/delete/1"))
                .andExpect(status().isOk());

        verify(aluguelService, times(1)).delete(1L);
    }
}