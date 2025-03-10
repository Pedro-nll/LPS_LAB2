package com.lps.back.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
public class Agencia extends Usuario {

    @OneToMany(mappedBy = "agencia", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Automovel> automoveis;

    @OneToMany(mappedBy = "agencia", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Aluguel> alugueis;
}
