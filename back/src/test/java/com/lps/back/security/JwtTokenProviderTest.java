package com.lps.back.security;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.Instant;
import java.util.Date;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

class JwtTokenProviderTest {

    @InjectMocks
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private Authentication authentication;

    @Mock
    private UserDetails userDetails;

    private final String SECRET = "testSecret";
    private final long EXPIRATION_MINUTES = 30;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        ReflectionTestUtils.setField(jwtTokenProvider, "SECRET", SECRET);
        ReflectionTestUtils.setField(jwtTokenProvider, "EXPIRATION_MINUTES", EXPIRATION_MINUTES);
    }

    @Test
    void testGenerateToken() {
        // Arrange
        String username = "testUser";
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(userDetails.getUsername()).thenReturn(username);

        // Act
        String token = jwtTokenProvider.generateToken(authentication);

        // Assert
        assertNotNull(token);
        
        // Decode and verify the token
        DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC512(SECRET.getBytes()))
                .build()
                .verify(token);

        assertEquals(username, decodedJWT.getSubject());
        assertNotNull(decodedJWT.getIssuedAt());
        assertNotNull(decodedJWT.getExpiresAt());

        // Check if expiration time is set correctly
        long expectedExpirationTime = Instant.now().plusMillis(EXPIRATION_MINUTES * 60 * 1000L).toEpochMilli();
        long actualExpirationTime = decodedJWT.getExpiresAt().getTime();
        // Allow for a small time difference (e.g., 1 second) due to execution time
        assertTrue(Math.abs(expectedExpirationTime - actualExpirationTime) < 10000);
    }
}