package com.project.hotel.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.hotel.entity.User;

public interface UserRepository extends JpaRepository<User, String>{
	User findByemail(String Email);
	User findByphnNumber(String phnNumber);
}
