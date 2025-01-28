package com.example.demo.Entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "car_master")
@Data
public class CarMaster {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "car_id")
    private int carId;
	
	@ManyToOne
    @JoinColumn(name = "cartype_id")
    private CarTypeMaster carType;
	
	@Column(name = "car_name")
    private String carName;

    @Column(name = "number_plate", unique = true, length = 50)
    private String numberPlate;

    @Column(name = "status")
    private String Status;

    @Column(name = "mileage")
    private double mileage;

    @ManyToOne
    @JoinColumn(name = "hub_id")
    private HubMaster hub;

    @Enumerated(EnumType.STRING)
    @Column(name = "is_available")
    private AvailabilityStatus isAvailable;

    @Column(name = "maintenance_due_date")
    private Date maintenanceDueDate;

    public enum AvailabilityStatus {
        Y, N
    }
	
	

}
