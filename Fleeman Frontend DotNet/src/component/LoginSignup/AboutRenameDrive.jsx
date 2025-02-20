import React from "react";
import { Container, Box, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { styled, keyframes } from '@mui/system';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AnimatedBox = styled(Box)`
  animation: ${fadeIn} 1s ease-in-out;
`;

const teamMembers = [
  { name: "Member 1", qualification: "Qualification 1", image: "path/to/image1.jpg" },
  { name: "Member 2", qualification: "Qualification 2", image: "path/to/image2.jpg" },
  { name: "Member 3", qualification: "Qualification 3", image: "path/to/image3.jpg" },
  { name: "Member 4", qualification: "Qualification 4", image: "path/to/image4.jpg" },
  { name: "Member 5", qualification: "Qualification 5", image: "path/to/image5.jpg" },
  { name: "Member 6", qualification: "Qualification 6", image: "path/to/image6.jpg" },
  { name: "Member 7", qualification: "Qualification 7", image: "path/to/image7.jpg" },
  { name: "Member 8", qualification: "Qualification 8", image: "path/to/image8.jpg" },
];

const AboutIndiaDrive = () => {
  return (
    <AnimatedBox sx={{ minHeight: "100vh", backgroundColor: "#F8F9FA", padding: 4 }}>
      <Container>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: 4, color: '#333' }}>
          About Fleeman
        </Typography>
        <Typography variant="body1" sx={{ color: '#333', marginBottom: 4 }}>
          It allows customers of the company (User) to browse & rent a car along with optional Add-Ons. The system provides user to select pick-up & return hub. It also allows the company staff to handover & return of the vehicle, prepare bill and manage the fleet.
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', marginBottom: 4, color: '#333' }}>
          Our Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ backgroundColor: "#FFFFFF", color: "#333" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={member.image}
                  alt={member.name}
                />
                <CardContent>
                  <Typography variant="h6">{member.name}</Typography>
                  <Typography variant="body2">{member.qualification}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </AnimatedBox>
  );
};

export default AboutIndiaDrive;
