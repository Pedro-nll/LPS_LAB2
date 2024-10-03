package com.lps.back.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

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

    @Column(nullable = false, name = "logradouro", unique = false)
    private String logradouro;

    @Column(nullable = false, name = "complemento", unique = false)
    private String complemento;

    @Column(nullable = false, name = "bairro", unique = false)
    private String bairro;

    @Column(nullable = false, name = "cidade", unique = false)
    private String cidade;

    @Column(nullable = false, name = "estado", unique = false)
    private String estado;

    @Column(nullable = false, name = "cep", unique = false)
    private String cep;

    @OneToOne(targetEntity = Cliente.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "cliente_id", unique = true)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @JsonIgnore
    private Cliente cliente;
}
