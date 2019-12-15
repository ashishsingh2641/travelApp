package com.project.hotel.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.hotel.entity.User;

public interface UserRepository extends JpaRepository<User, String>{
	User findByEmail(String email);
	User findByphnNumber(String phnNumber);
}
