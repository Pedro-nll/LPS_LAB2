package com.lps.back.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lps.back.models.Emprego;
import com.lps.back.repositories.EmpregoRepository;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class EmpregoService {

    @Autowired
    private EmpregoRepository empregosRepository;

    public Emprego save(Emprego empregos) {
        return empregosRepository.save(empregos);
    }

    public Emprego update(Emprego empregos) {
        return empregosRepository.save(empregos);
    }

    public void delete(Long id) {
        empregosRepository.deleteById(id);
    }

    public Emprego getById(Long id) {
        return empregosRepository.findById(id).get();
    }

    public void saveAll(List<Emprego> empregos) {
        empregosRepository.saveAll(empregos);
    }
}
