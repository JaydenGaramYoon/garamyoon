import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import auth from "../lib/auth-helper.js";

const Contact = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [contact_number, setContactNumber] = useState('');
    const [email_address, setEmailAddress] = useState('');
    const [message, setMessage] = useState('');
    const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setAlert({ show: false, message: '', severity: 'success' });

        try {
            // Save to contacts collection
            const userId = auth.isAuthenticated() ? auth.isAuthenticated().user._id : null;
            
            const contactData = {
                first_name,
                last_name,
                email_address,
                contact_number,
                message,
                userId: userId
            };

            const response = await fetch('/api/contacts', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData),
            });

            const result = await response.json();

            if (response.ok) {
                setAlert({
                    show: true,
                    message: "Message sent successfully!",
                    severity: 'success'
                });

                // Reset form
                setFirstName('');
                setLastName('');
                setEmailAddress('');
                setContactNumber('');
                setMessage('');
                
                // Navigate to home page after a delay
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setAlert({
                    show: true,
                    message: result.error || "Failed to send message",
                    severity: 'error'
                });
            }
        } catch (error) {
            setAlert({
                show: true,
                message: "Network error. Please try again.",
                severity: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container
            maxWidth="lg"
            sx={{
                mt: 5,
                px: 3,
                py: 4,
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    fontWeight: 800,
                    color: "#3eb93e",
                    letterSpacing: -0.3,
                    mb: 4,
                    textAlign: "center",
                }}
            >
                Contact
            </Typography>

            {/* Contact Icons */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 4 }}>
                <IconButton
                    component="a"
                    href="mailto:rkfka9536@gmail.com"
                    sx={{
                        color: "#3eb93e",
                        '&:hover': { color: "#2a8a2a" }
                    }}
                >
                    <EmailIcon fontSize="large" />
                </IconButton>

                <IconButton
                    component="a"
                    href="https://www.linkedin.com/in/garam-yoon"
                    target="_blank"
                    sx={{
                        color: "#3eb93e",
                        '&:hover': { color: "#2a8a2a" }
                    }}
                >
                    <LinkedInIcon fontSize="large" />
                </IconButton>

                <IconButton
                    component="a"
                    href="https://github.com/JaydenGaramYoon"
                    target="_blank"
                    sx={{
                        color: "#3eb93e",
                        '&:hover': { color: "#2a8a2a" }
                    }}
                >
                    <GitHubIcon fontSize="large" />
                </IconButton>

                {/* <IconButton
                    component="a"
                    href="https://www.notion.so/1e097141ccc38075bc31eb034c0910ef?v=1e097141ccc380219636000c91bf3741&pvs=4"
                    target="_blank"
                    sx={{
                        color: "#3eb93e",
                        '&:hover': { color: "#2a8a2a" }
                    }}
                >
                    <MenuBookIcon fontSize="large" />
                </IconButton> */}
            </Box>

            <Typography
                variant="body1"
                sx={{ mb: 4, textAlign: "center" }}
            >
                I appreciate your time and consideration. <br />Please feel free to reach out, I'd love to connect!
            </Typography>

            {/* Alert Messages */}
            {alert.show && (
                <Alert 
                    severity={alert.severity} 
                    onClose={() => setAlert({ ...alert, show: false })}
                    sx={{ mb: 3, maxWidth: '600px', mx: 'auto' }}
                >
                    {alert.message}
                </Alert>
            )}

            {/* Contact Form - temporarily disabled */}
            {false && (
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, mx: 'auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Grid container spacing={3} sx={{ width: '100%', justifyContent: 'center' }}>
                      <Grid item xs={12} md={6}>
                          <TextField
                              fullWidth
                              label="First Name"
                              name="first_name"
                              value={first_name}
                              onChange={(e) => setFirstName(e.target.value)}
                              required
                              variant="outlined"
                          />
                      </Grid>
                      <Grid item xs={12} md={6}>
                          <TextField
                              fullWidth
                              label="Last Name"
                              name="last_name"
                              value={last_name}
                              onChange={(e) => setLastName(e.target.value)}
                              required
                              variant="outlined"
                          />
                      </Grid>
                      <Grid item xs={12} md={6}>
                          <TextField
                              fullWidth
                              label="Email Address"
                              name="email_address"
                              type="email"
                              value={email_address}
                              onChange={(e) => setEmailAddress(e.target.value)}
                              required
                              variant="outlined"
                          />
                      </Grid>
                      <Grid item xs={12} md={6}>
                          <TextField
                              fullWidth
                              label="Contact Number"
                              name="contact_number"
                              type="tel"
                              value={contact_number}
                              onChange={(e) => setContactNumber(e.target.value)}
                              required
                              variant="outlined"
                          />
                      </Grid>
                      <Grid item xs={12} width={'80%'}>
                          <TextField
                              fullWidth
                              label="Message"
                              name="message"
                              multiline
                              rows={4}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              required
                              variant="outlined"
                          />
                      </Grid>
                  </Grid>
                  
                  {/* Send Message Button - Separate from Grid */}
                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', width: '100%' }}>
                      <Button
                          type="submit"
                          variant="contained"
                          disabled={isLoading}
                          sx={{
                              backgroundColor: "#3eb93e",
                              '&:hover': { backgroundColor: "#2a8a2a" },
                              px: 4,
                              py: 1.5,
                              fontSize: "1rem",
                          }}
                      >
                          {isLoading ? "Sending..." : "Send Message"}
                      </Button>
                  </Box>
              </Box>
            )}
        </Container>
    );
};

export default Contact;
