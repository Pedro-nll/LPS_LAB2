package com.lps.back.dtos;

import com.lps.back.enumeration.Situacao;
import com.lps.back.models.Agencia;
import com.lps.back.models.Aluguel;
import com.lps.back.models.Automovel;
import com.lps.back.models.Banco;
import com.lps.back.models.Cliente;


public record AluguelDTO(
        Long id,
        Double valorMensal,
        Double valorPendente,
        Boolean atrasado,
        Boolean ativo,
        Double taxaJuros,
        String automovelMatricula,
        Long agenciaId,
        Long banco,
        Long clienteId) {

    public static AluguelDTO fromEntity(Aluguel aluguel) {
        return new AluguelDTO(
                aluguel.getId(),
                aluguel.getValorMensal(),
                aluguel.getValorPendente(),
                aluguel.getAtrasado(),
                aluguel.getAtivo(),
                aluguel.getTaxaJuros(),
                aluguel.getAutomovelMatricula(),
                aluguel.getAgenciaIdentifier(),
                aluguel.getBanco(),
                aluguel.getClienteId());
    }

    public Aluguel toEntity(Agencia agencia, Automovel automovel, Cliente cliente, Banco banco) {
        Aluguel aluguel = new Aluguel();
        aluguel.setId(this.id());
        aluguel.setValorMensal(this.valorMensal());
        aluguel.setValorPendente(this.valorPendente());
        aluguel.setAtrasado(this.atrasado());
        aluguel.setAtivo(this.ativo());
        aluguel.setTaxaJuros(this.taxaJuros());
        aluguel.setSituacao(Situacao.PENDENTE);
        aluguel.setAutomovel(automovel);
        aluguel.setAgencia(agencia);
        aluguel.setCliente(cliente);
        aluguel.setBanco(banco);
        return aluguel;
    }
}
