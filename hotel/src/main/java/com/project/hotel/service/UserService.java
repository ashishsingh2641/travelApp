package com.project.hotel.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.hotel.entity.User;

public interface UserService {
	public ResponseEntity<User> userRegister(@RequestBody User user);
	public ResponseEntity<User> userLogin( @RequestBody User user);
}
