package com.example.demo.Repository;

import com.example.demo.Entity.AirportMaster;
import com.example.demo.Entity.AirportMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

@Repository
public interface AirportRepository extends JpaRepository<AirportMaster, Integer> {

    @Query(value = """
        SELECT h.hub_id, h.hub_name, h.hub_address_and_details
        FROM hub_master h
        JOIN airport_master a ON a.hub_id = h.hub_id
        WHERE a.airport_code = ?1
    """, nativeQuery = true)

    List<Object[]> getAirportByNames (Integer airportCode);
}





