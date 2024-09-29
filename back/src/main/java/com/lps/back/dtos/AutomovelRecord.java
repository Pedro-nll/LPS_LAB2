package com.lps.back.dtos;

import com.lps.back.models.Agencia;
import com.lps.back.models.Automovel;

public record AutomovelRecord(
        String matricula,
        Integer ano,
        String marca,
        String modelo,
        String placa,
        Boolean alugado,
        String imageUrl,
        Long AgenciaId) {

    public AutomovelRecord toRecord(Automovel automovel) {
        return new AutomovelRecord(
                automovel.getMatricula(),
                automovel.getAno(),
                automovel.getMarca(),
                automovel.getModelo(),
                automovel.getPlaca(),
                automovel.getAlugado(),
                automovel.getImageUrl(),
                automovel.getAgencia().getId());
    }

    public static Automovel fromRecord(AutomovelRecord record, Agencia agencia) {
        return new Automovel(
                record.matricula(),
                record.ano(),
                record.marca(),
                record.modelo(),
                record.placa(),
                record.alugado(),
                record.imageUrl(),
                agencia, // Assuming you will set Agencia later
                null // Assuming you will set Aluguel list later
        );
    }
}
