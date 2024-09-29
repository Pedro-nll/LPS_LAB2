package com.lps.back.services.auth;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.lps.back.models.Agencia;
import com.lps.back.models.Cliente;
import com.lps.back.models.Usuario;
import com.lps.back.repositories.UsuarioRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AuthService implements UserDetailsService {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email);

        if (usuario == null) {
            throw new UsernameNotFoundException("Usuário não encontrado com o email: " + email);
        }

        List<GrantedAuthority> authorities = new ArrayList<>();

        if (usuario instanceof Cliente)
            authorities.add(new SimpleGrantedAuthority("isCliente"));
        else if (usuario instanceof Agencia)
            authorities.add(new SimpleGrantedAuthority("isAgencia"));
        return new org.springframework.security.core.userdetails.User(usuario.getEmail(), usuario.getPassword(),
                authorities);
    }
}