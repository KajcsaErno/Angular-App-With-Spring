package com.example.angularbackendapp.controllers;

import com.example.angularbackendapp.model.UserDTO;
import com.example.angularbackendapp.services.UserService;
import com.sipios.springsearch.anotation.SearchSpec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user/{id}")
    public UserDTO getUser(@PathVariable("id") Long id) {
        return userService.getUser(id);
    }

    @GetMapping("/allUsers")
    public List<UserDTO> getAllUser() {
        return userService.getUsers();
    }

    @PostMapping("/user")
    public void addUser(@RequestBody UserDTO userDTO) {
        userService.addUser(userDTO);
    }

    @PutMapping("/user/{id}")
    public void updateUser(@PathVariable("id") Long id, @RequestBody UserDTO userDTO) {
        userService.updateUser(id, userDTO);
    }

    @DeleteMapping("delete/user/{id}")
    public void deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
    }

    //TODO Elasticsearch
    @GetMapping("/users")
    @ResponseBody
    public ResponseEntity<List<UserDTO>> search(@SearchSpec Specification<UserDTO> specs) {
        return userService.searchForUsers(specs);
    }
}


