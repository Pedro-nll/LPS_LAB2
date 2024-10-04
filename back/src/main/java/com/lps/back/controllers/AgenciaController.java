package com.lps.back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lps.back.models.Agencia;
import com.lps.back.models.Cliente;
import com.lps.back.services.AgenciaService;

@RestController
@RequestMapping("/agencia")
public class AgenciaController {

    @Autowired
    private AgenciaService agenciaService;

    @PostMapping("/save")
    public ResponseEntity<Agencia> save(@RequestBody Agencia agencia) {
        return ResponseEntity.ok(agenciaService.save(agencia));
    }

    @PutMapping("/update")
    public ResponseEntity<Agencia> update(@RequestBody Agencia agencia) {
        return ResponseEntity.ok(agenciaService.update(agencia));
    }

    @GetMapping
    public ResponseEntity<?> findByLoggedUser() {
        Agencia patient = agenciaService.getLogged();
        return ResponseEntity.ok(patient);

    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> delete(@RequestBody Long id) {
        agenciaService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Agencia> findById(@PathVariable Long id) {
        return ResponseEntity.ok(agenciaService.findById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<Agencia>> findAll() {
        return ResponseEntity.ok(agenciaService.findAll());
    }

}
