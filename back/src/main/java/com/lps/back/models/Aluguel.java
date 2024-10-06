package com.lps.back.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lps.back.enumeration.Situacao;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Aluguel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "valorMensal")
    private Double valorMensal;

    @Column(nullable = false, name = "valorPendente")
    private Double valorPendente;

    @Column(nullable = false, name = "atrasado")
    private Boolean atrasado;

    @Column(nullable = false, name = "ativo")
    private Boolean ativo;

    @Column(nullable = false, name = "taxaJuros")
    private Double taxaJuros;

    @Column(nullable = false, name = "situacao", scale = 0, columnDefinition = "SMALLINT")
    private Situacao situacao;

    @ManyToOne(targetEntity = Automovel.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "matricula", unique = false)
    @JsonIgnore
    private Automovel automovel;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "agencia_id", nullable = false, unique = false)
    @JsonIgnore
    private Agencia agencia;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "banco_id", nullable = false, unique = false)
    @JsonIgnore
    private Banco banco;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cliente_id", nullable = false, unique = false)
    @JsonIgnore
    private Cliente cliente;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    public Long getAgenciaIdentifier() {
        return agencia.getId();
    }

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    public Long getBanco() {
        return banco.getId();
    }

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    public Long getClienteId() {
        return cliente.getId();
    }

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    public String getAutomovelMatricula() {
        return automovel.getMatricula();
    }

}
