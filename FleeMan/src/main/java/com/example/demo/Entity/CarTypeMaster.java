package com.example.demo.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "car_type_master")
@Data
public class CarTypeMaster {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cartype_id")
    private long carTypeId;
	
	@Column(name = "cartype_name")
	private String carTypeName;

	@Column(name = "daily_rate")
	private double dailyRate;

	@Column(name = "weekly_rate")
	private double weeklyRate;

	 @Column(name = "monthly_rate")
	 private double monthlyRate;

	 @Column(name = "image_path")
	 private String imagePath;
	
	
}
