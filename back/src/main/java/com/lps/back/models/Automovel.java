package com.lps.back.models;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Automovel {
    @Id
    @Column(nullable = false, name = "matricula", unique = true)
    private String matricula;

    @Column(nullable = false, name = "ano", unique = false)
    private Integer ano;

    @Column(nullable = false, name = "marca", unique = false)
    private String marca;

    @Column(nullable = false, name = "modelo", unique = false)
    private String modelo;

    @Column(nullable = false, name = "placa", unique = true)
    private String placa;

    @Column(nullable = false, name = "alugado", unique = false)
    private Boolean alugado;

    @Column(nullable = false, name = "imageUrl", unique = false)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "agencia_id", nullable = false, unique = false)
    private Agencia agencia;

    @OneToMany(mappedBy = "automovel", fetch = FetchType.EAGER)
    private List<Aluguel> aluguel;
}
