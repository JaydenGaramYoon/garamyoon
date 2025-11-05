import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Home from '../core/Home.jsx';
import Services from './Services.jsx';
import Projects from './Projects.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';

const Section = ({ id, children }) => (
  <Box id={id} component="section" sx={{
    width: '100%',
    maxWidth: 1200,
    mx: 'auto',
    px: { xs: 2, sm: 3, md: 4 },
    py: { xs: 3, sm: 4, md: 6 }
  }}>
    {children}
  </Box>
);

// Shorter, centered divider used between sections
const SectionDivider = (props) => (
  <Divider sx={{ width: { xs: '90%', sm: '80%', md: '70%' }, mx: 'auto', my: { xs: 1, sm: 2 } }} {...props} />
);

export default function All() {
  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      <Section id="home">
        <Home />
      </Section>

      <SectionDivider />

      <Section id="projects">
        <Projects />
      </Section>

      <SectionDivider />

      <Section id="contact">
        <Contact />
      </Section>
    </Box>
  );
}
