package com.lps.back.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lps.back.dtos.AutomovelRecord;
import com.lps.back.models.Automovel;
import com.lps.back.services.AutomovelService;
import com.lps.back.services.auth.AuthService;

import org.springframework.http.MediaType;
import java.util.List;
import java.util.Arrays;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class AutomovelControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AutomovelService automovelService;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    private Automovel automovel;
    private AutomovelRecord automovelRecord;

    @BeforeEach
    void setUp() {
        automovel = new Automovel();
        automovel.setMatricula("ABC123");
        automovel.setAno(2022);
        automovel.setMarca("TestMarca");
        automovel.setModelo("TestModelo");
        automovel.setPlaca("XYZ789");
        automovel.setAlugado(false);
        automovel.setImageUrl("http://test.com/image.jpg");

        automovelRecord = new AutomovelRecord(
                "ABC123", 2022, "TestMarca", "TestModelo", "XYZ789", false, "http://test.com/image.jpg", 1L);
    }

    @Test
    void testSave() throws Exception {
        when(automovelService.save(any(AutomovelRecord.class))).thenReturn(automovel);

        mockMvc.perform(post("/veiculo/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(automovelRecord)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.matricula").value("ABC123"))
                .andExpect(jsonPath("$.marca").value("TestMarca"))
                .andExpect(jsonPath("$.modelo").value("TestModelo"));
    }

    @Test
    void testUpdate() throws Exception {
        when(automovelService.update(any(AutomovelRecord.class))).thenReturn(automovel);

        mockMvc.perform(post("/veiculo/update")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(automovelRecord)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.matricula").value("ABC123"))
                .andExpect(jsonPath("$.marca").value("TestMarca"))
                .andExpect(jsonPath("$.modelo").value("TestModelo"));
    }

    @Test
    void testDelete() throws Exception {
        doNothing().when(automovelService).delete("ABC123");

        mockMvc.perform(post("/veiculo/delete")
                .contentType(MediaType.APPLICATION_JSON)
                .content("\"ABC123\""))
                .andExpect(status().isOk());
    }

    @Test
    void testFindById_Success() throws Exception {
        when(automovelService.findById("ABC123")).thenReturn(automovel);

        mockMvc.perform(get("/veiculo/findById?matricula=ABC123"))
                .andExpect(status().isOk()) // Expect HTTP 200 status
                .andExpect(jsonPath("$.matricula").value("ABC123")) // Check that the matricula matches
                .andExpect(jsonPath("$.marca").value("TestMarca")) // Check other fields
                .andExpect(jsonPath("$.modelo").value("TestModelo"));
    }

    @Test
    void testFindById_NotFound() throws Exception {
        when(automovelService.findById("XYZ999")).thenReturn(null);

        mockMvc.perform(get("/findById/XYZ999"))
                .andExpect(status().isNotFound()); // Expect HTTP 404 status
    }

    @Test
    void testFindAll() throws Exception {
        List<Automovel> automoveis = Arrays.asList(automovel, new Automovel());
        when(automovelService.findAll()).thenReturn(automoveis);

        mockMvc.perform(get("/veiculo/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].matricula").value("ABC123"))
                .andExpect(jsonPath("$[0].marca").value("TestMarca"))
                .andExpect(jsonPath("$[0].modelo").value("TestModelo"))
                .andExpect(jsonPath("$[1]").exists());
    }

    @Test
    void testFindByAgenciaId() throws Exception {
        List<Automovel> automoveis = Arrays.asList(automovel, new Automovel());
        when(automovelService.findByAgenciaId(1L)).thenReturn(automoveis);

        mockMvc.perform(get("/veiculo/findByAgenciaId/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].matricula").value("ABC123"))
                .andExpect(jsonPath("$[0].marca").value("TestMarca"))
                .andExpect(jsonPath("$[0].modelo").value("TestModelo"))
                .andExpect(jsonPath("$[1]").exists());
    }
}