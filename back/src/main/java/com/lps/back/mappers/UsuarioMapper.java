package com.lps.back.mappers;

import com.lps.back.dtos.user.UserRegisterDTO;
import com.lps.back.dtos.user.UserReturnLoginDTO;
import com.lps.back.models.Usuario;
import com.lps.back.utils.UsuarioTypesEnum;

public class UsuarioMapper {
    public static Usuario dtoToModel(UserRegisterDTO userRegisterDTO) {
        Usuario usuario;

        switch (userRegisterDTO.userType()) {
            // case STUDENT:
            //     usuario = new Student(userRegisterDTO.name(), userRegisterDTO.email(), null);
            //     break;

            // case TEACHER:
            //     usuario = new Teacher(userRegisterDTO.name(), userRegisterDTO.email(), null);
            //     break;

            // case SECRETARY:
            //     usuario = new Secretary(userRegisterDTO.name(), userRegisterDTO.email(), null);
            //     break;

            default:
                throw new IllegalArgumentException("Tipo do usuário não especificado");
        }
        
    }

    public static UserReturnLoginDTO modelToDto(Usuario user, UsuarioTypesEnum userType) {
        UserReturnLoginDTO usuario = new UserReturnLoginDTO(user.getId(), user.getName(), user.getEmail(), userType);
        return usuario;
    }
}
