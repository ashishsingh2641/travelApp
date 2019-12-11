package com.project.hotel.controller;

import org.springframework.http.ResponseEntity;
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
		// TODO Auto-generated constructor stub
		this.service=service;
	}

	@Override
	@PostMapping("/register")
	public ResponseEntity<User> userRegister(@RequestBody User user) {
		// TODO Auto-generated method stub
		return service.userRegister(user);
	}

	@PostMapping("/login")
	public ResponseEntity<User> userLogin(@RequestBody User user) {
		// TODO Auto-generated method stub
		return service.userLogin(user);
	}

}
