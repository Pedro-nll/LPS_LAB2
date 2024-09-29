package com.lps.back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lps.back.services.interfaces.IUserService;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private IUserService userService;

}
