package com.example.demo.Entity;

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "booking_header_table")
@Data
public class BookingHeaderTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private long bookingId;

    @Column(name = "booking_date")
    private LocalDate bookingDate;

    @ManyToOne
    @JoinColumn(name = "cust_id", referencedColumnName = "cust_id",nullable=false)
    private CustomerMaster customer;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @ManyToOne
    @JoinColumn(name = "cartype_id")
    private CarTypeMaster carType;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private CarMaster car;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "address")
    private String address;

    @Column(name = "state")
    private String state;

    @Column(name = "pin")
    private String pin;

    @Column(name = "daily_rate")
    private double dailyRate;

    @Column(name = "weekly_rate")
    private double weeklyRate;

    @Column(name = "monthly_rate")
    private double monthlyRate;

    @Column(name = "Email_ID")
    private String emailId;

    @Column(name = "BookCar")
    private String Bookcar;


}