package com.lps.back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lps.back.models.Emprego;

public interface EmpregoRepository extends JpaRepository<Emprego, Long> {

}
