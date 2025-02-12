package com.example.controller;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Properties;

import org.springframework.stereotype.Component;

import jakarta.mail.Message;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;

@Component
public class EmailSender {

    public void send(String name, String email) {
        // Send email

        final String username = "fleeman042@gmail.com";
        final String password = "nmgj jimv ymqy fzhz"; // Use an app-specific password

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props,
              new jakarta.mail.Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(username, password);
                }
              });

        try {
            // Create a new email message
            MimeMessage message1 = new MimeMessage(session);
            message1.setRecipients(Message.RecipientType.TO,
            InternetAddress.parse(email));
            message1.setSubject("Booking Confirmation Mail");

            // Read the HTML template from a file
            String emailTemplate = new String(Files.readAllBytes(Paths.get("src/main/resources/emailTemplate.html")));

            // Replace placeholders with actual values
            emailTemplate = emailTemplate.replace("${name}", name);

            // Create the HTML part
            MimeBodyPart htmlPart = new MimeBodyPart();
            htmlPart.setContent(emailTemplate, "text/html");

            // Create a multipart message
            MimeMultipart multipart = new MimeMultipart();
            multipart.addBodyPart(htmlPart);

            // Set the multipart content to the message
            message1.setContent(multipart);

            // Send the email
            Transport.send(message1);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
