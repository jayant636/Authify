package com.example.authify.controller;

import com.example.authify.dto.AuthRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest){
       try{
          authenticate(authRequest.getEmail(),authRequest.getPassword());

       }
       catch (BadCredentialsException ex){
           Map<String,Object> error = new HashMap<>();
           error.put("error",true);
           error.put("message","Email or Password is incorrect");
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);

       }
       catch (Exception e){
           Map<String,Object> error = new HashMap<>();
           error.put("error",true);
           error.put("message","Authentication is failed");
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
       }
    }

    private void authenticate(String email, String password) {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));
    }
}
