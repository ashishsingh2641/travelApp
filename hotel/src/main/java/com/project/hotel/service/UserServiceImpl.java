package com.project.hotel.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.exception.CustomException;
import com.project.hotel.entity.User;
import com.project.hotel.repository.UserRepository;
import com.project.security.JwtTokenProvider;


@Service
public class UserServiceImpl implements UserService {
	UserRepository userRepository;
	HttpHeaders responseHeaders = new HttpHeaders();

	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository=userRepository;
	}
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	@Autowired
	private AuthenticationManager authenticationManager;

	public ResponseEntity<User> userRegister(User user) {

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

					responseHeaders.set("user","EMAIL OR PHONE NUMBER ALREADY EXISTS ");
					return ResponseEntity.status(HttpStatus.FORBIDDEN)
							.headers(responseHeaders)
							.body(user);

				}
			} catch (Exception e) {
				e.printStackTrace();
			}

		}
		return ResponseEntity.status(HttpStatus.FORBIDDEN)
				.headers(responseHeaders)
				.body(user);
	}
	
	@Override
	public ResponseEntity<String> userLogin(User user) {
		
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
			String jwtToken = jwtTokenProvider.createToken(user.getEmail(), userRepository.findByEmail(user.getEmail()).getRole());
			return ResponseEntity.status(HttpStatus.OK)
					.headers(responseHeaders)
					.body(jwtToken);
		} catch (AuthenticationException e) {
			throw new CustomException("Invalid username/password supplied", HttpStatus.UNPROCESSABLE_ENTITY);
		}
		
		/*
		 * User usernew=userRepository.findByphnNumber(user.getPhnNumber());
		 * if(null!=usernew) {
		 * if(user.getPhnNumber().equalsIgnoreCase(usernew.getPhnNumber()) &&
		 * user.getPassword().equalsIgnoreCase(usernew.getPassword())) { return
		 * ResponseEntity.status(HttpStatus.OK) .headers(responseHeaders)
		 * .body(usernew); } else { return ResponseEntity.status(HttpStatus.FORBIDDEN)
		 * .headers(responseHeaders) .body(usernew); } } return
		 * ResponseEntity.status(HttpStatus.FORBIDDEN) .headers(responseHeaders)
		 * .body(usernew);
		 */	
	}


	private boolean isPhoneNumberOrEmailAlreadyExist(com.project.hotel.entity.User user) throws Exception
	{
		if(null!=userRepository.findByEmail(user.getEmail())) {
			System.out.println("USer Email Exists");
			return true;
		}
		else if(null!=userRepository.findByphnNumber(user.getPhnNumber())) {
			System.out.println("User Phone Exists");
			return true;
		}else{
			return false;
		}

	}

}
