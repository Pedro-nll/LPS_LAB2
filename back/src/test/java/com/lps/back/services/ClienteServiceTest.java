package com.lps.back.services;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.lps.back.exceptions.ObjectNotFoundException;
import com.lps.back.models.Cliente;
import com.lps.back.models.Emprego;
import com.lps.back.models.Endereco;
import com.lps.back.repositories.ClienteRepository;

class ClienteServiceTest {

    @InjectMocks
    private ClienteService clienteService;

    @Mock
    private EmpregoService empregoService;

    @Mock
    private EnderecoService enderecoService;

    @Mock
    private UserService userService;

    @Mock
    private ClienteRepository clienteRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetBcrypt() {
        assertNotNull(clienteService.getBcrypt());
    }

    @Test
    void testGetLoggedPacient() throws ObjectNotFoundException {
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(authentication.getName()).thenReturn("test@example.com");
        Cliente mockCliente = new Cliente();
        when(userService.findByEmail("test@example.com")).thenReturn(mockCliente);

        Cliente result = clienteService.getLogged();
        assertNotNull(result);
        assertEquals(mockCliente, result);
    }

    @Test
    void testSave() {
        Cliente cliente = new Cliente();
        cliente.setPassword("password");
        cliente.setEmpregos(Arrays.asList(new Emprego(), new Emprego()));
        cliente.setEndereco(new Endereco());

        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");
        when(clienteRepository.save(any(Cliente.class))).thenReturn(cliente);
        when(enderecoService.save(any(Endereco.class))).thenReturn(new Endereco());

        Cliente result = clienteService.save(cliente);

        assertNotNull(result);
        assertNotEquals("encodedPassword", cliente.getPassword());
        verify(empregoService).saveAll(cliente.getEmpregos());
    }

    @Test
    void testSaveWithTooManyEmpregos() {
        Cliente cliente = new Cliente();
        cliente.setEmpregos(Arrays.asList(new Emprego(), new Emprego(), new Emprego(), new Emprego()));

        assertThrows(IllegalArgumentException.class, () -> clienteService.save(cliente));
    }

    @Test
    void testUpdate() {
        Cliente cliente = new Cliente();
        cliente.setEmpregos(Arrays.asList(new Emprego()));
        cliente.setEndereco(new Endereco());

        when(clienteRepository.save(any(Cliente.class))).thenReturn(cliente);

        Cliente result = clienteService.update(cliente);

        assertNotNull(result);
        verify(empregoService).saveAll(cliente.getEmpregos());
        verify(enderecoService).save(cliente.getEndereco());
    }

    @Test
    void testDelete() {
        Long id = 1L;
        clienteService.delete(id);
        verify(clienteRepository).deleteById(id);
    }

    @Test
    void testGetById() {
        Long id = 1L;
        Cliente mockCliente = new Cliente();
        when(clienteRepository.findById(id)).thenReturn(Optional.of(mockCliente));

        Cliente result = clienteService.getById(id);

        assertNotNull(result);
        assertEquals(mockCliente, result);
    }

    @Test
    void test_cliente_getSalario() {
        Cliente mockCliente = new Cliente();
        Emprego emprego1 = new Emprego();
        emprego1.setRendimento(1000.0);
        Emprego emprego2 = new Emprego();
        emprego2.setRendimento(2000.0);
        mockCliente.setEmpregos(Arrays.asList(emprego1, emprego2));

        double totalSalario = mockCliente.getSalario();

        assertEquals(3000.0, totalSalario);
    }
}