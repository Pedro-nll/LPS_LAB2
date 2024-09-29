package com.lps.back.controllers;

import java.util.UUID;

import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.lps.back.dtos.ChangePasswordDTO;
import com.lps.back.dtos.ForgetPasswordDTO;
import com.lps.back.dtos.ResponseDTO;
import com.lps.back.dtos.auth.LoginRequest;
import com.lps.back.dtos.auth.LoginResponse;
import com.lps.back.exceptions.ChangePasswordException;
import com.lps.back.exceptions.InvalidInformationException;
import com.lps.back.models.Cliente;
import com.lps.back.models.Usuario;
import com.lps.back.security.JwtTokenProvider;
import com.lps.back.services.EmailSenderService;
import com.lps.back.services.UserService;

@RestController()
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailSenderService emailSenderService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.email(),
                            loginRequest.password()));
            Usuario user = userService.getByEmail(loginRequest.email());
            String userType = (user instanceof Cliente) ? "Cliente" : "Funcionario";
            String jwt = tokenProvider.generateToken(authentication);
            return ResponseEntity.ok(new LoginResponse(jwt, userType));
        } catch (Exception e) {
            ResponseDTO responseDTO = new ResponseDTO("Dados inválidos",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseDTO);
        }
    }

    @PostMapping("/changePassword")
    @ResponseBody
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordDTO changePasswordDTO) {
        try {
            userService.changePassword(changePasswordDTO);
            return ResponseEntity.status(200).body("Password changed");
        } catch (ChangePasswordException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Confira os dados informados",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errResponseDTO);
        } catch (ObjectNotFoundException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Confira os dados informados",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errResponseDTO);
        } catch (Exception e) {
            ResponseDTO errResponseDTO = new ResponseDTO("System Error",
                    "Infelizmente estamos com dificuldade no sistema, tente novamente, se persistir entre em contato com o suporte");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(errResponseDTO);
        }

    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<?> sendToken(@RequestBody ForgetPasswordDTO forgetPasswordDTO) {

        try {
            Usuario user = userService.getByEmail(forgetPasswordDTO.email());
            String token = UUID.randomUUID().toString().substring(0, 5);
            userService.createPasswordResetTokenForUser(user.getId(), token);
            emailSenderService.sendRecoveryPasswordMail(user.getEmail(), token);
            return ResponseEntity.status(200).body("Email enviado para o usuário " +
                    user.getEmail());

        } catch (InvalidInformationException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Dados inválido",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errResponseDTO);
        } catch (ObjectNotFoundException e) {
            ResponseDTO errResponseDTO = new ResponseDTO("Vendedor não encontrado",
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errResponseDTO);
        } catch (Exception e) {
            ResponseDTO errResponseDTO = new ResponseDTO("System Error",
                    "Infelizmente estamos com dificuldade no sistema, tente novamente, se persistir entre em contato com o suporte");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(errResponseDTO);
        }
    }

}
