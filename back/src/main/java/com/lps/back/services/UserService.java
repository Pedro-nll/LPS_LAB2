package com.lps.back.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lps.back.repositories.UsuarioRepository;
import com.lps.back.services.interfaces.IUserService;

@Service
public class UserService implements IUserService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    EmailSenderService emailSenderService;


}