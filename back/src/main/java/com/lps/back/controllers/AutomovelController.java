package com.lps.back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lps.back.dtos.AutomovelRecord;
import com.lps.back.models.Automovel;
import com.lps.back.services.AutomovelService;

@RestController
@RequestMapping("/veiculo")
public class AutomovelController {

    @Autowired
    private AutomovelService automovelService;

    @PostMapping("/save")
    public ResponseEntity<Automovel> save(@RequestBody AutomovelRecord veiculo) {
        return ResponseEntity.ok(automovelService.save(veiculo));
    }

    @PostMapping("/update")
    public ResponseEntity<Automovel> update(@RequestBody AutomovelRecord veiculo) {
        return ResponseEntity.ok(automovelService.update(veiculo));
    }

    @PostMapping("/delete")
    public ResponseEntity<Void> delete(@RequestBody String matricula) {
        automovelService.delete(matricula);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/findById")
    public ResponseEntity<Automovel> findById(@RequestBody String matricula) {
        return ResponseEntity.ok(automovelService.findById(matricula));
    }

    @PostMapping("/all")
    public ResponseEntity<Iterable<Automovel>> findAll() {
        return ResponseEntity.ok(automovelService.findAll());
    }

    @PostMapping("/findByAgenciaId")
    public ResponseEntity<Iterable<Automovel>> findByAgenciaId(@RequestBody Long id) {
        return ResponseEntity.ok(automovelService.findByAgenciaId(id));
    }

}
