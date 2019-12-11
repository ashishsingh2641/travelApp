package com.project.hotel.service;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.hotel.entity.User;
import com.project.hotel.repository.UserRepository;



@Service
public class UserServiceImpl implements UserService{
UserRepository userRepository;
HttpHeaders responseHeaders = new HttpHeaders();
	public UserServiceImpl(UserRepository userRepository) {
		// TODO Auto-generated constructor stub
		this.userRepository=userRepository;
	}
	
	public ResponseEntity<User> userRegister(User user) {
		// TODO Auto-generated method stub
		if (null != user.getEmail() && null != user.getPhnNumber()
				&&	user.getEmail().trim().length() != 0
				&& user.getPhnNumber().toString().trim().length() != 0) {
				
				try {
					if(!isPhoneNumberOrEmailAlreadyExist(user))
					{
						
						userRepository.save(user);
						 HttpHeaders responseHeaders = new HttpHeaders();
						    responseHeaders.set("user", 
						      "success reg");
						   
						   	    return ResponseEntity.status(HttpStatus.OK)
						      .headers(responseHeaders)
						      .body(user);
					
					}
					else {
						
						    responseHeaders.set("user", 
						      "\"EMAIL OR PHONE NUMBER ALREADY EXISTS\"");
						 
						    return ResponseEntity.status(HttpStatus.FORBIDDEN)
						      .headers(responseHeaders)
						      .body(user);
					
					}
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}
			return ResponseEntity.status(HttpStatus.FORBIDDEN)
				      .headers(responseHeaders)
				      .body(user);
	}
	@Override
	public ResponseEntity<User> userLogin(User user) {
		// TODO Auto-generated method stub
		User usernew=userRepository.findByphnNumber(user.getPhnNumber());
		if(null!=usernew)
		{
			if(user.getPhnNumber().equalsIgnoreCase(usernew.getPhnNumber())
					&& user.getPassword().equalsIgnoreCase(usernew.getPassword()))
			{
				return ResponseEntity.status(HttpStatus.OK)
					      .headers(responseHeaders)
					      .body(usernew);
			}
			else {
				return ResponseEntity.status(HttpStatus.FORBIDDEN)
					      .headers(responseHeaders)
					      .body(usernew);
			}
		}
		return ResponseEntity.status(HttpStatus.FORBIDDEN)
			      .headers(responseHeaders)
			      .body(usernew);
	}
	
	
	private boolean isPhoneNumberOrEmailAlreadyExist(com.project.hotel.entity.User user) throws Exception
	{
		if(null!=userRepository.findByemail(user.getEmail())) {
			System.out.println("USer Email Exists");
		return true;
		}
		else
		
		if(null!=userRepository.findByphnNumber(user.getPhnNumber())) {
			System.out.println("USer phone Exists");
			return true;
			}
			else {
			return false;
			}
		
	}
	
	
}
