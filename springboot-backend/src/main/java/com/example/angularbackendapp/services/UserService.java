package com.example.angularbackendapp.services;

import com.example.angularbackendapp.model.UserDTO;
import com.example.angularbackendapp.model.UserRepository;
import com.sipios.springsearch.anotation.SearchSpec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserDTO getUser(Long id) {
        var user = userRepository.findById(id);
        return user.orElse(null);
    }

    public List<UserDTO> getUsers() {
        return userRepository.findAll();
    }

    public void addUser(UserDTO userDTO) {
        userRepository.save(userDTO);
    }

    public void updateUser(Long id, UserDTO userDTO) {
        var updatedUser = getUser(id);
        updatedUser.setName(userDTO.getName());
        updatedUser.setAge(userDTO.getAge());
        updatedUser.setEmail(userDTO.getEmail());
        userRepository.save(updatedUser);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public ResponseEntity<List<UserDTO>> searchForUsers(@SearchSpec Specification<UserDTO> specs) {
        return new ResponseEntity<>(userRepository.findAll(Specification.where(specs)), HttpStatus.OK);
    }
}
