package com.project.hotel.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.hotel.entity.RegisterProperty;
import com.project.hotel.repository.PropertyRepository;

@Service
public class PropertyServiceImpl implements PropertyService{

	private PropertyRepository repository;
	
	public PropertyServiceImpl(PropertyRepository repository) {
		this.repository=repository;
	}

	@Override
	public ResponseEntity<Object> addProperty(RegisterProperty prop) {
		repository.save(prop);
		return new ResponseEntity<Object>(HttpStatus.OK);
	}

}
