package com.example.demo.Repository;

import com.example.demo.Entity.CarMaster;
import com.example.demo.Entity.CarMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<CarMaster, Integer> {

    @Query(value = "SELECT car.car_name, car.is_available, hub.hub_name, hub.hub_address_and_details \n" +
            "            FROM car_master car LEFT JOIN hub_master hub \n" +
            "            ON car.hub_id = hub.hub_id \n" +
            "            WHERE hub.hub_address_and_details =:hubAddress ", nativeQuery = true)

    List<Object[]> findCarDetailsByHubAddress(String hubAddress);

}
