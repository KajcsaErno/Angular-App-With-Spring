package com.example.angularbackendapp;

import com.example.angularbackendapp.model.UserDTO;
import com.example.angularbackendapp.model.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.stream.Stream;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    CommandLineRunner init(UserRepository userRepository) {
        return args -> {
            Stream.of("John", "Julie", "Jennifer", "Helen", "Rachel", "Amelie").forEach(name -> {
                UserDTO userDTO = new UserDTO();
                userDTO.setName(name);
                userDTO.setAge((int) (Math.random() * ((100 - 1) + 1)));
                userDTO.setEmail(name.toLowerCase() + "@domain.com");
                userRepository.save(userDTO);
            });
            userRepository.findAll().forEach(System.out::println);
        };
    }

}
