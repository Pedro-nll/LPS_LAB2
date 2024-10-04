package com.lps.back.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lps.back.dtos.AutomovelRecord;
import com.lps.back.models.Agencia;
import com.lps.back.models.Automovel;
import com.lps.back.repositories.AutomovelRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AutomovelService {

    @Autowired
    private AgenciaService agenciaService;

    @Autowired
    private AutomovelRepository automovelRepository;

    public Automovel save(AutomovelRecord automovelRecord) {
        Agencia agencia = agenciaService.findById(automovelRecord.AgenciaId());
        Automovel automovel = AutomovelRecord.fromRecord(automovelRecord, agencia);
        return automovelRepository.save(automovel);
    }

    public Automovel update(AutomovelRecord automovelRecord) {
        Agencia agencia = agenciaService.findById(automovelRecord.AgenciaId());
        Automovel automovelInBase = this.findById(automovelRecord.matricula());
        Automovel automovel = AutomovelRecord.fromRecord(automovelRecord, agencia);
        automovel.setAluguel(automovelInBase.getAluguel());
        return automovelRepository.save(automovel);
    }

    public Automovel update(Automovel automovel) {
        Automovel automovelInBase = this.findById(automovel.getMatricula());
        automovel.setAluguel(automovelInBase.getAluguel());
        return automovelRepository.save(automovel);
    }

    public void delete(String matricula) {
        automovelRepository.deleteById(matricula);
    }

    public Automovel findById(String matricula) {
        return automovelRepository.findById(matricula).orElse(null);
    }

    public List<Automovel> findAll() {
        return automovelRepository.findAll();
    }

    public List<Automovel> findByAgenciaId(Long id) {
        return automovelRepository.findByAgenciaId(id);
    }

}
