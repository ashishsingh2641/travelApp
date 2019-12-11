package com.project.hotel.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.hotel.entity.RegisterProperty;

public interface PropertyRepository extends JpaRepository<RegisterProperty, String>{

}
