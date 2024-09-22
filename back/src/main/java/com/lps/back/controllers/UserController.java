package com.lps.back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lps.back.dtos.user.UserLoginDTO;
import com.lps.back.dtos.user.UserRecoverPasswordDTO;
import com.lps.back.dtos.user.UserRegisterDTO;
import com.lps.back.dtos.user.UserReturnLoginDTO;
import com.lps.back.dtos.user.UserTokenDto;
import com.lps.back.dtos.user.UserUpdateDTO;
import com.lps.back.models.Usuario;
import com.lps.back.services.interfaces.IUserService;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private IUserService userService;


}
