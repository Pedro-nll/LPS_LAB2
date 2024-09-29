package com.lps.back.models;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@PrimaryKeyJoinColumn(name = "id")
@Entity
public class Cliente extends Usuario {

    @Column(name = "rg", nullable = false, unique = true, columnDefinition = "VARCHAR(9)")
    private String rg;

    @Column(name = "cpf", nullable = false, unique = true, columnDefinition = "VARCHAR(11)")
    private String cpf;

    @OneToOne(targetEntity = Endereco.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "endereco_id", unique = true)
    private Endereco endereco;

    @OneToMany(mappedBy = "cliente", fetch = FetchType.EAGER)
    private List<Emprego> empregos;

}
