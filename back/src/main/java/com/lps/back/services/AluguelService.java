package com.lps.back.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lps.back.dtos.AluguelDTO;
import com.lps.back.enumeration.Situacao;
import com.lps.back.models.Agencia;
import com.lps.back.models.Aluguel;
import com.lps.back.models.Automovel;
import com.lps.back.models.Banco;
import com.lps.back.models.Cliente;
import com.lps.back.repositories.AluguelRepository;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class AluguelService {
    @Autowired
    private BancoService bancoService;

    @Autowired
    private AluguelRepository aluguelRepository;

    @Autowired
    private AutomovelService automovelService;

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private AgenciaService agenciaService;

    public Aluguel save(AluguelDTO aluguelDTO) {
        Automovel automovel = automovelService.findById(aluguelDTO.automovelMatricula());
        Cliente cliente = clienteService.getById(aluguelDTO.clienteId());
        Agencia agencia = agenciaService.findById(aluguelDTO.agenciaId());
        Banco banco = bancoService.findById(aluguelDTO.banco());
        Aluguel aluguel = aluguelDTO.toEntity(agencia, automovel, cliente, banco);

        if (!bancoService.checkClienteValue(aluguel)) {
            this.changeState(aluguel, Situacao.RECUSADOPELOBANCO);
        } else if (aluguel.getSituacao() != Situacao.APROVADO) {
            this.changeState(aluguel, Situacao.APROVADOPELOBANCO);
        }
        return aluguel;
    }

    public Aluguel update(AluguelDTO aluguelDTO) {
        Automovel automovel = automovelService.findById(aluguelDTO.automovelMatricula());
        Cliente cliente = clienteService.getById(aluguelDTO.clienteId());
        Agencia agencia = agenciaService.findById(aluguelDTO.agenciaId());
        Banco banco = bancoService.findById(aluguelDTO.banco());
        Aluguel aluguel = aluguelDTO.toEntity(agencia, automovel, cliente, banco);
        if (!bancoService.checkClienteValue(aluguel)) {
            this.changeState(aluguel, Situacao.RECUSADOPELOBANCO);
        } else if (aluguel.getSituacao() != Situacao.APROVADO) {
            this.changeState(aluguel, Situacao.APROVADOPELOBANCO);
        }
        return aluguel;
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
        Automovel automovel = automovelService.findById(matricula);
        return aluguelRepository.findByAutomovel(automovel);
    }

    public List<Aluguel> findByClienteId(Long id) {
        Cliente cliente = clienteService.getById(id);
        return aluguelRepository.findByCliente(cliente);
    }

    public List<Automovel> findByClienteIdCars(Long id) {
        Cliente cliente = clienteService.getById(id);
        List<Aluguel> alugueis = aluguelRepository.findByCliente(cliente);
        List<Automovel> automoveis = new ArrayList<Automovel>();
        for (Aluguel aluguel : alugueis) {
            automoveis.add(aluguel.getAutomovel());
        }
        return automoveis;
    }

    public List<Aluguel> findByAgenciaId(Long id) {
        Agencia agencia = agenciaService.findById(id);
        return aluguelRepository.findByAgencia(agencia);
    }

    public void changeState(Aluguel aluguel, Situacao state) {
        aluguel.setSituacao(state);
        aluguelRepository.save(aluguel);
    }

    public void changeState(Long aluguelId, Situacao state) {
        Aluguel aluguel = this.findById(aluguelId);
        aluguel.setSituacao(state);
        Automovel automovel = aluguel.getAutomovel();
        automovel.setAlugado(state == Situacao.APROVADO);
        automovelService.update(automovel);
        aluguelRepository.save(aluguel);
    }
}
