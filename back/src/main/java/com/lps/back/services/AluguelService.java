package com.lps.back.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lps.back.models.Aluguel;
import com.lps.back.repositories.AluguelRepository;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class AluguelService {

    @Autowired
    private AluguelRepository aluguelRepository;

    public Aluguel save(Aluguel aluguel) {
        return aluguelRepository.save(aluguel);
    }

    public Aluguel update(Aluguel aluguel) {
        return aluguelRepository.save(aluguel);
    }

    public void delete(Long id) {
        aluguelRepository.deleteById(id);
    }

    public Aluguel findById(Long id) {
        return aluguelRepository.findById(id).orElse(null);
    }

    public List<Aluguel> findAll() {
        return aluguelRepository.findAll();
    }

    public List<Aluguel> findByAutomovelMatricula(String matricula) {
        return aluguelRepository.findByAutomovelMatricula(matricula);
    }

    public List<Aluguel> findByClienteId(Long id) {
        return aluguelRepository.findByClienteId(id);
    }

    public List<Aluguel> findByAgenciaId(Long id) {
        return aluguelRepository.findByAgenciaId(id);
    }

}
