package com.project.hotel.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.hotel.entity.User;

public interface UserController {
	public ResponseEntity<User> userRegister(@RequestBody User user);
	public ResponseEntity<String> userLogin( @RequestBody User user);
}
