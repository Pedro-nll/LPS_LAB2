package com.lps.back.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Automovel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "matricula", nullable = false, unique = true)
    private String matricula;

    @Column(name = "ano", nullable = false)
    private int ano;

    @Column(name = "marca", nullable = false)
    private String marca;

    @Column(name = "modelo", nullable = false)
    private String modelo;

    @Column(name = "placa", nullable = false, unique = true)
    private String placa;

    @Column(name = "alugado", nullable = false)
    private Boolean alugado;

    //TODO: RELAções
}
