package com.example.controller;

import java.util.Map;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

	@Autowired
	private EmailService emailService;
	
	
	@PostMapping("/sendEmail")
	public ResponseEntity<String> emailSender(@RequestBody Map<String, Object> emailMaster)
	{


		String username = (String)emailMaster.get("name");
		String email = (String) emailMaster.get("email");

		emailService.sendEmail(username, email);

		return ResponseEntity.status(HttpStatus.OK).body("Email sent successfully");
	}

}
