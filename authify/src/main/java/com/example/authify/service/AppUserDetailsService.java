package com.example.authify.service;

import com.example.authify.entity.UserEntity;
import com.example.authify.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
     UserEntity userEntity =  userRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("User not Found with this email:"+email));
     return new User(userEntity.getEmail(), userEntity.getPassword(), new ArrayList<>());
    }
}
