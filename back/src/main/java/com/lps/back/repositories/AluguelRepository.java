package com.lps.back.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lps.back.models.Aluguel;

public interface AluguelRepository extends JpaRepository<Aluguel, Long> {

    List<Aluguel> findByClienteId(Long clienteId);

    List<Aluguel> findByAutomovelMatricula(String imovelId);

    List<Aluguel> findByAgenciaId(Long agenciaId);
}
