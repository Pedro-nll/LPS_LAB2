package com.lps.back.dtos;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import com.lps.back.enumeration.Situacao;
import com.lps.back.models.Agencia;
import com.lps.back.models.Aluguel;
import com.lps.back.models.Automovel;
import com.lps.back.models.Banco;
import com.lps.back.models.Cliente;

class AluguelDTOTest {

    @Test
    void testFromEntity() {
        Automovel auto = new Automovel();
        auto.setMatricula("ABC123");

        Agencia age = new Agencia();
        age.setId(2L);

        Banco ba = new Banco();
        ba.setId(3L);

        Cliente cli = new Cliente();
        cli.setId(4L);
        
        Aluguel aluguel = new Aluguel();
        aluguel.setId(1L);
        aluguel.setValorMensal(1000.0);
        aluguel.setValorPendente(500.0);
        aluguel.setAtrasado(false);
        aluguel.setAtivo(true);
        aluguel.setTaxaJuros(0.05);
        aluguel.setAutomovel(auto);
        aluguel.setAgencia(age);
        aluguel.setBanco(ba);
        aluguel.setCliente(cli);

        AluguelDTO dto = AluguelDTO.fromEntity(aluguel);

        assertEquals(1L, dto.id());
        assertEquals(1000.0, dto.valorMensal());
        assertEquals(500.0, dto.valorPendente());
        assertFalse(dto.atrasado());
        assertTrue(dto.ativo());
        assertEquals(0.05, dto.taxaJuros());
        assertEquals("ABC123", dto.automovelMatricula());
        assertEquals(2L, dto.agenciaId());
        assertEquals(3L, dto.banco());
        assertEquals(4L, dto.clienteId());
    }

    @Test
    void testToEntity() {
        AluguelDTO dto = new AluguelDTO(1L, 1000.0, 500.0, false, true, 0.05, "ABC123", 2L, 3L, 4L);

        Agencia agencia = Mockito.mock(Agencia.class);
        Automovel automovel = Mockito.mock(Automovel.class);
        Cliente cliente = Mockito.mock(Cliente.class);
        Banco banco = Mockito.mock(Banco.class);

        Aluguel aluguel = dto.toEntity(agencia, automovel, cliente, banco);

        assertEquals(1L, aluguel.getId());
        assertEquals(1000.0, aluguel.getValorMensal());
        assertEquals(500.0, aluguel.getValorPendente());
        assertFalse(aluguel.getAtrasado());
        assertTrue(aluguel.getAtivo());
        assertEquals(0.05, aluguel.getTaxaJuros());
        assertEquals(Situacao.PENDENTE, aluguel.getSituacao());
        assertEquals(automovel, aluguel.getAutomovel());
        assertEquals(agencia, aluguel.getAgencia());
        assertEquals(cliente, aluguel.getCliente());
    }

    @Test
    void testRecordComponents() {
        AluguelDTO dto = new AluguelDTO(1L, 1000.0, 500.0, false, true, 0.05, "ABC123", 2L, 3L, 4L);

        assertEquals(1L, dto.id());
        assertEquals(1000.0, dto.valorMensal());
        assertEquals(500.0, dto.valorPendente());
        assertFalse(dto.atrasado());
        assertTrue(dto.ativo());
        assertEquals(0.05, dto.taxaJuros());
        assertEquals("ABC123", dto.automovelMatricula());
        assertEquals(2L, dto.agenciaId());
        assertEquals(3L, dto.banco());
        assertEquals(4L, dto.clienteId());
    }
}