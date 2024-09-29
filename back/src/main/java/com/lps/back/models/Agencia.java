package com.lps.back.models;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.Builder;

@Builder
@PrimaryKeyJoinColumn(name = "id")
@Entity
public class Agencia extends Usuario {

}
