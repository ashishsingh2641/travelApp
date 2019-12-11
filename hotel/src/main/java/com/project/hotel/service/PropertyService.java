package com.project.hotel.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.hotel.entity.RegisterProperty;

public interface PropertyService {
	public ResponseEntity<Object> addProperty(@RequestBody RegisterProperty prop);
}
