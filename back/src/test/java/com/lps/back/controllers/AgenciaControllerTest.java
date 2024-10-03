package com.lps.back.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lps.back.models.Agencia;
import com.lps.back.services.AgenciaService;
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
public class AgenciaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AgenciaService agenciaService;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    private Agencia agencia;

    @BeforeEach
    void setUp() {
        agencia = new Agencia();
        agencia.setId(1L);
        agencia.setName("Test Agency");
        agencia.setEmail("test@agency.com");
        agencia.setPassword("password");
    }

    @Test
    void testSave() throws Exception {
        when(agenciaService.save(any(Agencia.class))).thenReturn(agencia);

        mockMvc.perform(post("/agencia/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(agencia)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Test Agency"))
                .andExpect(jsonPath("$.email").value("test@agency.com"));
    }

    @Test
    void testUpdate() throws Exception {
        when(agenciaService.update(any(Agencia.class))).thenReturn(agencia);

        mockMvc.perform(put("/agencia/update")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(agencia)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Test Agency"))
                .andExpect(jsonPath("$.email").value("test@agency.com"));
    }

    @Test
    void testDelete() throws Exception {
        doNothing().when(agenciaService).delete(1L);

        mockMvc.perform(delete("/agencia/delete")
                .contentType(MediaType.APPLICATION_JSON)
                .content("1"))
                .andExpect(status().isOk());

        verify(agenciaService, times(1)).delete(1L);
    }

    @Test
    void testFindById() throws Exception {
        when(agenciaService.findById(1L)).thenReturn(agencia);

        mockMvc.perform(get("/agencia/findById/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Test Agency"))
                .andExpect(jsonPath("$.email").value("test@agency.com"));
    }

    @Test
    void testFindAll() throws Exception {
        List<Agencia> agencias = Arrays.asList(agencia, new Agencia());
        when(agenciaService.findAll()).thenReturn(agencias);

        mockMvc.perform(get("/agencia/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Test Agency"))
                .andExpect(jsonPath("$[0].email").value("test@agency.com"))
                .andExpect(jsonPath("$[1]").exists());
    }
}