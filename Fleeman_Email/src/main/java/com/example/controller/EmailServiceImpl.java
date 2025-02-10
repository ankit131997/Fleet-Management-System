package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private EmailSender emailSender;

    @Override
    public void sendEmail(String username, String email) {
        // Send email

        emailSender.send(username, email);
    }

}
