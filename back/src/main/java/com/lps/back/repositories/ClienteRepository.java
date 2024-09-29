package com.lps.back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lps.back.models.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}
