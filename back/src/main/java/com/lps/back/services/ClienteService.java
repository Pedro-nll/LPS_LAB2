package com.lps.back.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lps.back.exceptions.ObjectNotFoundException;
import com.lps.back.models.Cliente;
import com.lps.back.repositories.ClienteRepository;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class ClienteService {

    @Autowired
    private EmpregoService empregoService;

    @Autowired
    private EnderecoService enderecoService;

    @Autowired
    private UserService userService;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private final PasswordEncoder encoder = new BCryptPasswordEncoder();

    public PasswordEncoder getBcrypt() {
        return this.encoder;
    }

    public Cliente getLoggedPacient() throws ObjectNotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Cliente patient = (Cliente) userService.findByEmail(authentication.getName());

        return patient;
    }

    public Cliente save(Cliente cliente) {
        cliente.setPassword(encoder.encode(cliente.getPassword()));
        clienteRepository.save(cliente);

        cliente.getEmpregos().forEach(emprego -> emprego.setCliente(cliente));
        empregoService.saveAll(cliente.getEmpregos());

        cliente.getEndereco().setCliente(cliente);
        enderecoService.save(cliente.getEndereco());
        return cliente;
    }

    public Cliente update(Cliente cliente) {
        empregoService.saveAll(cliente.getEmpregos());
        enderecoService.save(cliente.getEndereco());
        return clienteRepository.save(cliente);
    }

    public void delete(Long id) {
        clienteRepository.deleteById(id);
    }

    public Cliente getById(Long id) {
        return clienteRepository.findById(id).get();
    }
}
