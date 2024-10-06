package com.lps.back.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI().info(new Info().title("Aramune Express Aluguel API").description("API for Aramune Express Aluguel project")
                .contact(new Contact().name("Aramune Express Aluguel Team")).version("1.0"));
    }
}