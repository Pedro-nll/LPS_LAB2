package com.lps.back.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@PrimaryKeyJoinColumn(name = "id")
@Entity
public class Cliente extends Usuario {

    @Column(name = "rg", nullable = false, unique = true, columnDefinition = "VARCHAR(9)")
    private String rg;

    @Column(name = "cpf", nullable = false, unique = true, columnDefinition = "VARCHAR(11)")
    private String cpf;
}
