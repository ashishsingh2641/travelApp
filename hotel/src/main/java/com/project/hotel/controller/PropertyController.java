package com.project.hotel.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.hotel.entity.RegisterProperty;

public interface PropertyController {
public ResponseEntity<Object> addProperty(@RequestBody RegisterProperty prop);
}
