package com.lps.back.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lps.back.models.Aluguel;
import com.lps.back.models.Banco;
import com.lps.back.repositories.BancoRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BancoService {

    @Autowired
    private BancoRepository bancoRepository;

    public void save(Banco banco) {
        bancoRepository.save(banco);
    }

    public void update(Banco banco) {
        bancoRepository.save(banco);
    }

    public void delete(Long id) {
        bancoRepository.deleteById(id);
    }

    public Banco findById(Long id) {
        return bancoRepository.findById(id).orElse(null);
    }

    public List<Banco> findAll() {
        return bancoRepository.findAll();
    }

    public boolean checkClienteValue(Aluguel aluguel) {
        if (aluguel.getValorMensal() > aluguel.getCliente().getSalario() * 0.7) {
            return false;
        }
        return true;
    }

}
