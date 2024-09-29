package com.lps.back.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Builder
@Data
@EqualsAndHashCode(callSuper = true)
@PrimaryKeyJoinColumn(name = "id")
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Banco extends Usuario {

    @OneToMany(mappedBy = "agencia", fetch = FetchType.EAGER)
    private List<Aluguel> alugueis;

    public Banco(String nome, String email, String senha, List<Aluguel> alugueis) {
        super(nome, email, senha);
        this.alugueis = alugueis;
    }
}
