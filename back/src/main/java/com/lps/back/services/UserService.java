package com.lps.back.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lps.back.dtos.ChangePasswordDTO;
import com.lps.back.exceptions.ChangePasswordException;
import com.lps.back.exceptions.ObjectNotFoundException;
import com.lps.back.models.PasswordResetToken;
import com.lps.back.models.Usuario;
import com.lps.back.repositories.PasswordTokenRepository;
import com.lps.back.repositories.UsuarioRepository;
import com.lps.back.services.interfaces.IUserService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Transactional
@Service
public class UserService implements IUserService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordTokenRepository passwordTokenRepository;

    @Autowired
    private final PasswordEncoder encoder = new BCryptPasswordEncoder();

    public PasswordEncoder getBcrypt() {
        return this.encoder;
    }

    public Usuario getById(Long id) {
        return usuarioRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado"));
    }

    public Usuario getByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public void changePassword(ChangePasswordDTO changePasswordDTO)
            throws ObjectNotFoundException, ChangePasswordException {
        if (changePasswordDTO.token() != null && !changePasswordDTO.token().isEmpty()) {

            Usuario user = usuarioRepository.findByEmail(changePasswordDTO.email());
            PasswordResetToken token = passwordTokenRepository.findByUserAndToken(user,
                    changePasswordDTO.token());
            if (token == null) {
                throw new ChangePasswordException("Token invalido");
            }
            if (user == null) {
                throw new ObjectNotFoundException("Usuário não existente");
            }
            if (!changePasswordDTO.novaSenha().equals(changePasswordDTO.confirmacaoNovaSenha())) {
                throw new ChangePasswordException("Nova senha e a confirmação não são iguais");
            }

            System.out.println(user.getPassword());

            user.setPassword(changePasswordDTO.novaSenha());
            save(user);
            passwordTokenRepository.delete(token);
        }
    }

    @Override
    public Usuario save(Usuario user) {
        user.setPassword(encoder.encode(user.getPassword()));
        this.save(user);

        return user;

    }

    public void update(Usuario user, Long id) {

        Usuario userInBase = this.getById(id);
        user.setId(userInBase.getId());

        this.save(user);
    }

    public Usuario deleteUserById(Long id) throws EntityNotFoundException {
        Usuario obj = this.getById(id);
        this.usuarioRepository.delete(obj);

        return obj;
    }

    public void createPasswordResetTokenForUser(Long id, String token) {
        Usuario user = this.getById(id);
        PasswordResetToken Basetoken = passwordTokenRepository.findByUser(user);
        PasswordResetToken myToken;
        if (Basetoken == null) {
            myToken = new PasswordResetToken(null, token, user);
        } else {
            myToken = Basetoken;
            myToken.setToken(token);
        }

        passwordTokenRepository.save(myToken);
    }

    public Usuario findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
}
