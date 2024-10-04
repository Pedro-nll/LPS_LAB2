package com.lps.back.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lps.back.exceptions.ObjectNotFoundException;
import com.lps.back.models.Agencia;
import com.lps.back.repositories.AgenciaRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AgenciaService {

    @Autowired
    private AgenciaRepository agenciaRepository;

    @Autowired
    private UserService userService;
    @Autowired
    private final PasswordEncoder encoder = new BCryptPasswordEncoder();

    public PasswordEncoder getBcrypt() {
        return this.encoder;
    }

    public Agencia save(Agencia agencia) {
        agencia.setPassword(encoder.encode(agencia.getPassword()));
        return agenciaRepository.save(agencia);
    }

    public Agencia update(Agencia agencia) {
        agencia.setPassword(encoder.encode(agencia.getPassword()));
        return agenciaRepository.save(agencia);
    }

    public void delete(Long id) {
        agenciaRepository.deleteById(id);
    }

    public Agencia findById(Long id) {
        return agenciaRepository.findById(id).orElse(null);
    }

    public List<Agencia> findAll() {
        return agenciaRepository.findAll();
    }

    public Agencia getLogged() throws ObjectNotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Agencia user = (Agencia) userService.findByEmail(authentication.getName());

        return user;
    }
}
