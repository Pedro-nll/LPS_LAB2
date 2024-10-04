package com.lps.back.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lps.back.models.Cliente;
import com.lps.back.services.ClienteService;
import com.lps.back.services.auth.AuthService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class ClienteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ClienteService clienteService;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    private Cliente cliente;

    @BeforeEach
    void setUp() {
        cliente = new Cliente();
        cliente.setId(1L);
        cliente.setName("Test Client");
        cliente.setEmail("test@client.com");
        cliente.setPassword("password");
        cliente.setRg("123456789");
        cliente.setCpf("12345678901");
    }

    @Test
    void testSave() throws Exception {
        when(clienteService.save(cliente)).thenReturn(cliente);

        mockMvc.perform(post("/cliente/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(cliente)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.tittle").value("Cliente Cadastrado"))
                .andExpect(jsonPath("$.message").value("Seja bem-vindo à LPS, a melhor agência de alugeis do Brasil!"));

        verify(clienteService, times(1)).save(any(Cliente.class));
    }

    @Test
    void testFindByLoggedUser() throws Exception {
        when(clienteService.getLoggedPacient()).thenReturn(cliente);

        mockMvc.perform(get("/cliente"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Test Client"))
                .andExpect(jsonPath("$.email").value("test@client.com"))
                .andExpect(jsonPath("$.rg").value("123456789"))
                .andExpect(jsonPath("$.cpf").value("12345678901"));

        verify(clienteService, times(1)).getLoggedPacient();
    }

    @Test
    void testUpdate() throws Exception {
        when(clienteService.update(cliente)).thenReturn(cliente);

        mockMvc.perform(put("/cliente/update")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(cliente)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.tittle").value("Cliente Atualizado"))
                .andExpect(jsonPath("$.message").value("Seus dados foram atualizados com sucesso!"));

        verify(clienteService, times(1)).update(any(Cliente.class));
    }
}