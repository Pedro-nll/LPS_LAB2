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

import com.lps.back.dtos.AluguelDTO;
import com.lps.back.dtos.ResponseDTO;
import com.lps.back.enumeration.Situacao;
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
        return ResponseEntity.ok(aluguelService.findByClienteIdCars(id));
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
    public ResponseEntity<?> save(@RequestBody AluguelDTO aluguel) {
        return ResponseEntity.ok(aluguelService.save(aluguel));
    }

    @PutMapping("/update/")
    public ResponseEntity<?> update(@RequestBody AluguelDTO aluguel) {
        return ResponseEntity.ok(aluguelService.update(aluguel));
    }

    @PostMapping("/acceptAluguel/{id}")
    public ResponseEntity<?> acceptAluguel(@PathVariable Long id) {

        ResponseDTO response = new ResponseDTO("Aluguel Aceito",
                "O aluguel foi aceito com sucesso!");
        aluguelService.changeState(id, Situacao.APROVADO);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/recAluguel/{id}")
    public ResponseEntity<?> recAluguel(@PathVariable Long id) {
        ResponseDTO response = new ResponseDTO("Aluguel Recusado",
                "O aluguel foi recusado com sucesso!");
        aluguelService.changeState(id, Situacao.RECUSADOPELAAGENCIA);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        aluguelService.delete(id);
        return ResponseEntity.ok().build();
    }
}
