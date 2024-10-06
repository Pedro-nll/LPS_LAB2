package com.lps.back.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lps.back.models.Banco;
import com.lps.back.services.BancoService;

@RestController
@RequestMapping("/banc")
public class BancoController {

    @Autowired
    private BancoService bancoService;

    @GetMapping
    public ResponseEntity<?> findByLoggedUser() {
        List<Banco> bancos = bancoService.findAll();
        return ResponseEntity.ok(bancos);

    }

}
