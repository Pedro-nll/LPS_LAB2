package com.lps.back.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Emprego {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "profissao", nullable = true, unique = false)
    private String profissao;

    @Column(name = "entidadeEmpregadora", nullable = true, unique = false)
    private String entidadeEmpregadora;

    @Column(name = "rendimento", nullable = true, unique = false)
    private Double rendimento;

    @ManyToOne
    private Cliente cliente;

}
