package com.project.hotel.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.hotel.entity.User;
import com.project.hotel.service.UserService;

@RestController
@RequestMapping("api/user")
public class userControllerImpl implements UserController{
	
	private UserService service;
	
	public userControllerImpl(UserService service) {
		this.service=service;
	}

	@Override
	@PostMapping("/register")
	public ResponseEntity<User> userRegister(@RequestBody User user) {
		return service.userRegister(user);
	}

	@PostMapping("/login")
	public ResponseEntity<String> userLogin(@RequestBody User user) {
		return service.userLogin(user);
	}

}
