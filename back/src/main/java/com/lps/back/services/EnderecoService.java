package com.lps.back.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lps.back.models.Endereco;
import com.lps.back.repositories.EnderecoRepository;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class EnderecoService {

    @Autowired
    private EnderecoRepository enderecoRepository;

    public Endereco save(Endereco endereco) {
        return enderecoRepository.save(endereco);
    }

    public Endereco update(Endereco endereco) {
        return enderecoRepository.save(endereco);
    }

    public void delete(Long id) {
        enderecoRepository.deleteById(id);
    }

    public Endereco getById(Long id) {
        return enderecoRepository.findById(id).get();
    }
}
