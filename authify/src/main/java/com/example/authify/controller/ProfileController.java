package com.example.authify.controller;

import com.example.authify.dto.ProfileRequest;
import com.example.authify.dto.ProfileResponse;
import com.example.authify.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ProfileController {

    private final ProfileService profileService;

    @PostMapping("/register")
    public ProfileResponse register(@Valid @RequestBody ProfileRequest request){
        return profileService.createProfile(request);
    }
}
