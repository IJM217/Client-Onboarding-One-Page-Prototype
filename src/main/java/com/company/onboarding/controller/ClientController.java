package com.company.onboarding.controller;

import com.company.onboarding.model.Client;
import com.company.onboarding.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    @PostMapping("/register")
    public ResponseEntity<String> registerClient(
            @RequestParam("fullName") String fullName,
            @RequestParam("dob") String dob,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("nationality") String nationality,
            @RequestParam(value = "idNumber", required = false) String idNumber,
            @RequestParam(value = "passportNumber", required = false) String passportNumber,
            @RequestParam("bankStatement") MultipartFile bankStatement) {
        try {
            Client client = new Client();
            client.setFullName(fullName);
            client.setDob(LocalDate.parse(dob));
            client.setEmail(email);
            client.setPhone(phone);
            client.setNationality(nationality);

            if ("South Africa".equalsIgnoreCase(nationality)) {
                client.setIdNumber(idNumber);
            } else {
                client.setPassportNumber(passportNumber);
            }

            if (!bankStatement.isEmpty()) {
                client.setBankStatement(bankStatement.getBytes());
                client.setFileName(bankStatement.getOriginalFilename());
            }

            clientRepository.save(client);
            return ResponseEntity.ok("Client registered successfully");

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error uploading file");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error saving client: " + e.getMessage());
        }
    }
}
