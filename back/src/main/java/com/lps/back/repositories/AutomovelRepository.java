package com.lps.back.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lps.back.models.Automovel;

public interface AutomovelRepository extends JpaRepository<Automovel, String> {

    List<Automovel> findByMarca(String marca);

    List<Automovel> findByAgenciaId(Long AgenciaId);
}
