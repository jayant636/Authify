package com.example.authify.service;

import com.example.authify.dto.ProfileRequest;
import com.example.authify.dto.ProfileResponse;
import com.example.authify.entity.UserEntity;
import com.example.authify.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService{

    private final UserRepository userRepository;

    @Override
    public ProfileResponse createProfile(ProfileRequest request) {
        UserEntity userEntity = convertToUserEntity(request);
        if(userRepository.existsByEmail(userEntity.getEmail())){
            throw new RuntimeException("Profile already exists");
        }
        userEntity = userRepository.save(userEntity);
        return convertToProfileResponse(userEntity);
    }

    private UserEntity convertToUserEntity(ProfileRequest request){
       return  UserEntity.builder()
                .email(request.getEmail())
                .userId(UUID.randomUUID().toString())
                .name(request.getName())
                .password(request.getPassword())
                .isAccountverified(false)
                .resetOtpExpireAt(0L)
                .verifyOtp(null)
                .verifyOtpExpiredAt(0L)
                .resetOtp(null)
                .build();
    }

    private ProfileResponse convertToProfileResponse(UserEntity userEntity){
        return  ProfileResponse.builder()
                .name(userEntity.getName())
                .email(userEntity.getEmail())
                .userId(userEntity.getUserId())
                .isAccountverified(userEntity.getIsAccountverified())
                .build();
    }
}
