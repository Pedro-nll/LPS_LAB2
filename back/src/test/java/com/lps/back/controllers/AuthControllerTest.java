package com.lps.back.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.hamcrest.Matchers.containsString;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lps.back.dtos.ChangePasswordDTO;
import com.lps.back.dtos.ForgetPasswordDTO;
import com.lps.back.dtos.auth.LoginRequest;
import com.lps.back.exceptions.ChangePasswordException;
import com.lps.back.exceptions.ObjectNotFoundException;
import com.lps.back.models.Cliente;
import com.lps.back.models.Usuario;
import com.lps.back.security.JwtTokenProvider;
import com.lps.back.services.EmailSenderService;
import com.lps.back.services.UserService;
import com.lps.back.services.auth.AuthService;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private JwtTokenProvider tokenProvider;

    @MockBean
    private UserService userService;

    @MockBean
    private EmailSenderService emailSenderService;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    @Test
    void testAuthenticateUser() throws Exception {
        LoginRequest loginRequest = new LoginRequest("test@example.com", "password");
        Authentication authentication = mock(Authentication.class);
        Usuario user = new Cliente();
        String jwt = "mocked.jwt.token";

        when(authenticationManager.authenticate(any())).thenReturn(authentication);
        when(userService.getByEmail(anyString())).thenReturn(user);
        when(tokenProvider.generateToken(any())).thenReturn(jwt);

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").value(jwt))
                .andExpect(jsonPath("$.userType").value("isCliente"));
    }

    @Test
    void testAuthenticateUserInvalidCredentials() throws Exception {
        LoginRequest loginRequest = new LoginRequest("test@example.com", "wrongpassword");

        when(authenticationManager.authenticate(any())).thenThrow(new BadCredentialsException("Invalid credentials"));

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.tittle").value("Dados inválidos"));
    }

    @Test
    void testChangePassword() throws Exception {
        ChangePasswordDTO changePasswordDTO = new ChangePasswordDTO("JWTToken", "test@example.com", "oldPassword", "newPassword");

        mockMvc.perform(post("/auth/changePassword")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(changePasswordDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string("Password changed"));

        verify(userService).changePassword(changePasswordDTO);
    }

    @Test
    void testChangePasswordWithException() throws Exception {
        ChangePasswordDTO changePasswordDTO = new ChangePasswordDTO("JWTToken", "test@example.com", "oldPassword", "newPassword");

        doThrow(new ChangePasswordException("Invalid old password")).when(userService).changePassword(any());

        mockMvc.perform(post("/auth/changePassword")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(changePasswordDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.tittle").value("Confira os dados informados"));
    }

    @Test
    void testSendToken() throws Exception {
        ForgetPasswordDTO forgetPasswordDTO = new ForgetPasswordDTO("test@example.com");
        Usuario user = new Cliente();
        user.setEmail("test@example.com");

        when(userService.getByEmail(anyString())).thenReturn(user);

        mockMvc.perform(post("/auth/forgotPassword")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(forgetPasswordDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Email enviado para o usuário")));

        verify(userService).createPasswordResetTokenForUser(any(), anyString());
        verify(emailSenderService).sendRecoveryPasswordMail(anyString(), anyString());
    }

}
