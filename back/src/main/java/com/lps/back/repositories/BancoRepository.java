package com.lps.back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lps.back.models.Banco;

public interface BancoRepository extends JpaRepository<Banco, Long> {

}
