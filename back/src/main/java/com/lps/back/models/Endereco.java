package com.lps.back.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "logradouro", length = 100, unique = false)
    private String logradouro;

    @Column(nullable = false, name = "complemento", length = 10, unique = false)
    private String complemento;

    @Column(nullable = false, name = "bairro", length = 10, unique = false)
    private String bairro;

    @Column(nullable = false, name = "cidade", length = 10, unique = false)
    private String cidade;

    @Column(nullable = false, name = "estado", length = 10, unique = false)
    private String estado;

    @Column(nullable = false, name = "cep", length = 10, unique = false)
    private String cep;

    @OneToOne(targetEntity = Cliente.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "cliente_id", unique = true)
    private Cliente cliente;
}
