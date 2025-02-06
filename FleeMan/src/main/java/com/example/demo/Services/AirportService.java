package com.example.demo.Service;

import com.example.demo.Repository.AirportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AirportService {

    @Autowired
    private AirportRepository airportRepository;

    public List<Object[]> getHubByAirport(Integer airportCode) {
        List<Object[]> hubList = null;
        try {

            if (airportCode == null) {
                throw new IllegalArgumentException("Airport code cannot be null");
            }

            hubList = airportRepository.getAirportByNames(airportCode);

            if (hubList == null || hubList.isEmpty()) {
                throw new RuntimeException("No hubs found for the given airport code");
            }

        } catch (Exception e) {


            throw new RuntimeException("Error fetching hub details: " + e.getMessage(), e);
        }
        return hubList;
    }

}




