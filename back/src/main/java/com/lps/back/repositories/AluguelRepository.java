package com.lps.back.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lps.back.models.Agencia;
import com.lps.back.models.Aluguel;
import com.lps.back.models.Automovel;
import com.lps.back.models.Cliente;

public interface AluguelRepository extends JpaRepository<Aluguel, Long> {

    List<Aluguel> findByCliente(Cliente cliente);

    List<Aluguel> findByAutomovel(Automovel matricula);

    List<Aluguel> findByAgencia(Agencia agenciaId);
}
