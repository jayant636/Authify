package com.example.authify.service;

import com.example.authify.dto.ProfileRequest;
import com.example.authify.dto.ProfileResponse;

public interface ProfileService {

    ProfileResponse createProfile(ProfileRequest request);
}
