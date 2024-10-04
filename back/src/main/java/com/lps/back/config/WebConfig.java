package com.lps.back.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.lps.back.enumeration.Situacao;
import com.lps.back.models.Agencia;
import com.lps.back.models.Aluguel;
import com.lps.back.models.Automovel;
import com.lps.back.models.Banco;
import com.lps.back.models.Cliente;
import com.lps.back.models.Emprego;
import com.lps.back.models.Endereco;
import com.lps.back.repositories.AgenciaRepository;
import com.lps.back.repositories.AluguelRepository;
import com.lps.back.repositories.AutomovelRepository;
import com.lps.back.repositories.BancoRepository;
import com.lps.back.repositories.ClienteRepository;
import com.lps.back.repositories.EnderecoRepository;
import com.lps.back.services.ClienteService;

@Configuration
@EnableWebMvc
@Component
public class WebConfig implements WebMvcConfigurer, CommandLineRunner {
        @Autowired
        private AgenciaRepository agenciaRepository;

        @Autowired
        private AutomovelRepository automovelRepository;

        @Autowired
        private AluguelRepository aluguelRepository;

        @Autowired
        private ClienteRepository clienteRepository;

        @Autowired
        private BancoRepository bancoRepository;

        @Autowired
        private ClienteService clienteService;

        @Autowired
        private final PasswordEncoder encoder = new BCryptPasswordEncoder();

        public PasswordEncoder getBcrypt() {
                return this.encoder;
        }

        @Override
        public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "DELETE");
        }

        @Value("${spring.profiles.active}")
        private String activeProfile;

        @Override
        public void run(String... args) throws Exception {
                if (activeProfile.equals("test")) {
                        Agencia agencia = new Agencia();
                        agencia.setName("Agencia 1");
                        agencia.setEmail("agencia1@example.com");
                        agencia.setPassword(encoder.encode(("123")));
                        agenciaRepository.save(agencia);

                        // Create and save a 'Banco' entity
                        Banco banco = new Banco("Banco 1", "banco1@example.com", encoder.encode(("password123")),
                                        new ArrayList<>());
                        bancoRepository.save(banco);

                        // Create and save a 'Cliente' entity
                        Cliente cliente = new Cliente();
                        cliente.setName("123");
                        cliente.setEmail("123@gmail.com");
                        cliente.setPassword(encoder.encode(("123")));
                        cliente.setRg("123456789");
                        cliente.setCpf("12345678901");

                        Endereco end = new Endereco();
                        end.setBairro("teste");
                        end.setCep("teste");
                        end.setCidade("teste");
                        end.setComplemento("teste");
                        end.setEstado("teste");
                        end.setLogradouro("teste");

                        cliente.setEndereco(end);


                        Emprego emp1 = new Emprego(null, "dev", "dti", 1200.00, cliente);
                        List<Emprego> empregos = new ArrayList<>();
                        empregos.add(emp1);
                        cliente.setEmpregos(empregos);
                        clienteService.save(cliente);        

                        // Create and save an 'Automovel' entity
                        Automovel automovel = new Automovel();
                        automovel.setMatricula("AUTO123");
                        automovel.setAno(2020);
                        automovel.setMarca("Toyota");
                        automovel.setModelo("Corolla");
                        automovel.setPlaca("XYZ1234");
                        automovel.setAlugado(false);
                        automovel.setImageUrl("https://example.com/car.png");
                        automovel.setAgencia(agencia); // Set the associated 'Agencia'
                        automovelRepository.save(automovel);

                        // Create and save an 'Aluguel' entity
                        Aluguel aluguel = new Aluguel();
                        aluguel.setValorMensal(500.00);
                        aluguel.setValorPendente(0.00);
                        aluguel.setAtrasado(false);
                        aluguel.setAtivo(true);
                        aluguel.setTaxaJuros(0.02);
                        aluguel.setSituacao(Situacao.PENDENTE); // Assuming Situacao is an enum in your project
                        aluguel.setAutomovel(automovel); // Set the associated 'Automovel'
                        aluguel.setAgencia(agencia); // Set the associated 'Agencia'
                        aluguel.setBanco(banco); // Set the associated 'Banco'
                        aluguel.setCliente(cliente); // Set the associated 'Cliente'
                        aluguelRepository.save(aluguel);

                        // Assign the 'Aluguel' to the 'Agencia' and 'Banco'
                        List<Aluguel> alugueis = new ArrayList<>();
                        alugueis.add(aluguel);
                        agencia.setAlugueis(alugueis);
                        banco.setAlugueis(alugueis);
                        agenciaRepository.save(agencia);
                        bancoRepository.save(banco);

                        System.out.println("Data initialized successfully!");

                }
        }
}