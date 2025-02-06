package com.example.demo.Controller;

import com.example.demo.Entity.HubMaster;


import com.example.demo.Repository.projection.HubInfoProjection;
import com.example.demo.Services.HubService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
//@RequiredArgsConstructor
@RequestMapping("api/v1")
public class HubController {

    @Autowired
    private HubService hubService;

    @GetMapping("hub")
    public ResponseEntity<List<HubInfoProjection>> getAllHubListByCityIdAndStateId(@RequestParam String cityName, @RequestParam String stateName) {
        List<HubInfoProjection>  hubs = hubService.getAllHubByCityIdAndStateId(cityName, stateName);
        return new ResponseEntity<>(hubs, HttpStatus.OK);
    }


}

