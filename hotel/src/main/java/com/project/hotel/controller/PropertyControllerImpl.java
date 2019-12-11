package com.project.hotel.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.hotel.entity.RegisterProperty;
import com.project.hotel.service.PropertyService;

@RestController
@RequestMapping("api/property")
public class PropertyControllerImpl implements PropertyController{
private PropertyService service;
	public PropertyControllerImpl(PropertyService service){
		// TODO Auto-generated constructor stub
		this.service=service;
	}

	@Override
	@PostMapping("/addProperty")
	public ResponseEntity<Object> addProperty(@RequestBody RegisterProperty prop) {
		// TODO Auto-generated method stub
		return service.addProperty(prop);
	}

}
