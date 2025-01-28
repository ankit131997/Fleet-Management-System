package com.example.demo.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "hub_master")
@Data
public class HubMaster {

	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hub_id")
    private int hubId;
	
	
	@Column(name = "hub_name")
	private String hubName;
	
	@Column(name = "hub_address_and_details", columnDefinition = "TEXT")
	private String hubAddressAndDetails;
	    
	@Column(name = "contact_number", unique = true) 
	private Long contactNumber;
	    
	@ManyToOne
	@JoinColumn(name = "city_id")
	private CityMaster city;
	    
	@ManyToOne
	@JoinColumn(name = "state_id")
	private StateMaster state;

	 
}
