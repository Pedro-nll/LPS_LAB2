package com.lps.back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lps.back.dtos.ResponseDTO;
import com.lps.back.models.Cliente;
import com.lps.back.services.ClienteService;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody Cliente cliente) {
        ResponseDTO response = new ResponseDTO("Cliente Cadastrado",
                "Seja bem-vindo à LPS, a melhor agência de alugeis do Brasil!");
        clienteService.save(cliente);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<?> findByLoggedUser() {
        Cliente cliente = clienteService.getLogged();
        return ResponseEntity.ok(cliente);

    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody Cliente cliente) {
        clienteService.update(cliente);

        return ResponseEntity.ok(new ResponseDTO("Cliente Atualizado", "Seus dados foram atualizados com sucesso!"));
    }

}
