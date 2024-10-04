package com.lps.back.services;
import static org.mockito.Mockito.*;

import java.io.UnsupportedEncodingException;
import java.util.Locale;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

class EmailSenderServiceTest {

    @InjectMocks
    private EmailSenderService emailSenderService;

    @Mock
    private JavaMailSender mailSender;

    @Mock
    private Environment environment;

    @Mock
    private TemplateEngine htmlTemplateEngine;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        LocaleContextHolder.setLocale(Locale.ENGLISH);
    }

    @Test
    void testSendRecoveryPasswordMail() throws MessagingException, UnsupportedEncodingException {
        // Arrange
        String email = "test@example.com";
        String token = "testToken";
        MimeMessage mimeMessage = mock(MimeMessage.class);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
        when(environment.getProperty("spring.email.properties.email.smtp.from")).thenReturn("from@example.com");
        when(htmlTemplateEngine.process(eq("RecoveryPassword"), any(Context.class))).thenReturn("<html>Test</html>");

        // Act
        emailSenderService.sendRecoveryPasswordMail(email, token);

        // Assert
        verify(mailSender).send(mimeMessage);
    }

    @Test
    void testSendNewUser() throws MessagingException, UnsupportedEncodingException {
        // Arrange
        String email = "test@example.com";
        String password = "testPassword";
        MimeMessage mimeMessage = mock(MimeMessage.class);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
        when(environment.getProperty("spring.mail.properties.mail.smtp.from")).thenReturn("from@example.com");
        when(htmlTemplateEngine.process(eq("NewUser"), any(Context.class))).thenReturn("<html>Test</html>");

        // Act
        emailSenderService.sendNewUser(email, password);

        // Assert
        verify(mailSender).send(mimeMessage);
    }
}
