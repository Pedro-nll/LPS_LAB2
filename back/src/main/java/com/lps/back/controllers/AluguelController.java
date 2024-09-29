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

import com.lps.back.models.Aluguel;
import com.lps.back.services.AluguelService;

@RestController
@RequestMapping("/aluguel")
public class AluguelController {

    @Autowired
    private AluguelService aluguelService;

    @GetMapping("/all")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(aluguelService.findAll());
    }

    @GetMapping("/findByClienteId/{id}")
    public ResponseEntity<?> findByClienteId(@PathVariable Long id) {
        return ResponseEntity.ok(aluguelService.findByClienteId(id));
    }

    @GetMapping("/findByAutomovelId/{id}")
    public ResponseEntity<?> findByAutomovelId(@PathVariable String id) {
        return ResponseEntity.ok(aluguelService.findByAutomovelMatricula(id));
    }

    @GetMapping("/findByAgenciaId/{id}")
    public ResponseEntity<?> findByAgenciaId(@PathVariable Long id) {
        return ResponseEntity.ok(aluguelService.findByAgenciaId(id));
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        return ResponseEntity.ok(aluguelService.findById(id));
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody Aluguel aluguel) {
        return ResponseEntity.ok(aluguelService.save(aluguel));
    }

    @PutMapping("/update/")
    public ResponseEntity<?> update(@RequestBody Aluguel aluguel) {
        return ResponseEntity.ok(aluguelService.update(aluguel));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        aluguelService.delete(id);
        return ResponseEntity.ok().build();
    }
}
