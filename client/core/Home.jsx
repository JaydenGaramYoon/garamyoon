// import React from "react";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// import Chip from "@mui/material/Chip";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import { Link } from "react-router-dom";

// const brand = {
//   main: "#3eb93e",
//   dark: "#2a8a2a",
// };

// const Home = () => {
//   return (
//     <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
//       {/* Hero Section */}
//       <Box sx={{ textAlign: "center", mb: 5 }}>
//         <Typography
//           variant="h3"
//           sx={{ fontWeight: 700, color: brand.main, mb: 1 }}
//         >
//           Hi, I'm Garam Yoon
//         </Typography>
//         <Typography variant="h6" sx={{ color: "text.secondary", mb: 3 }}>
//           Junior Agile QA Tester · ISTQB Certified
//         </Typography>

//         <Stack
//           direction={{ xs: "column", sm: "row" }}
//           spacing={1.5}
//           justifyContent="center"
//           sx={{ mb: 3 }}
//         >
//           <Button
//             component={Link}
//             to="/project"
//             variant="contained"
//             endIcon={<ArrowForwardIcon />}
//             sx={{
//               textTransform: "none",
//               bgcolor: brand.main,
//               ":hover": { bgcolor: brand.dark },
//             }}
//           >
//             View Projects
//           </Button>

//           <Button
//             component={Link}
//             to="/contact"
//             variant="outlined"
//             startIcon={<MailOutlineIcon />}
//             sx={{
//               textTransform: "none",
//               borderColor: brand.main,
//               color: brand.main,
//               ":hover": { borderColor: brand.dark, color: brand.dark },
//             }}
//           >
//             Contact Me
//           </Button>

//           <Button
//             component="a"
//             href="/Resume.pdf"
//             target="_blank"
//             rel="noopener"
//             variant="outlined"
//             startIcon={<ArticleOutlinedIcon />}
//             sx={{
//               textTransform: "none",
//               borderColor: brand.main,
//               color: brand.main,
//               ":hover": { borderColor: brand.dark, color: brand.dark },
//             }}
//           >
//             Download Resume
//           </Button>
//         </Stack>

//         <Stack direction="row" justifyContent="center" spacing={1.5}>
//           <Tooltip title="GitHub">
//             <IconButton
//               component="a"
//               href="https://github.com/"
//               target="_blank"
//               rel="noopener"
//               aria-label="GitHub"
//             >
//               <GitHubIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="LinkedIn">
//             <IconButton
//               component="a"
//               href="https://www.linkedin.com/"
//               target="_blank"
//               rel="noopener"
//               aria-label="LinkedIn"
//             >
//               <LinkedInIcon />
//             </IconButton>
//           </Tooltip>
//         </Stack>
//       </Box>

//       {/* About Section */}
//       <Box>
//         <Typography
//           variant="h4"
//           sx={{ fontWeight: 700, color: brand.main, mb: 2, textAlign: "center" }}
//         >
//           About Me
//         </Typography>
//         <Typography
//           variant="body1"
//           sx={{ fontSize: { xs: "1rem", md: "1.05rem" }, lineHeight: 1.8, mb: 3, textAlign: "justify" }}
//         >
//           I am an ISTQB-certified Agile Software Tester and a Software Engineering Technician student at Centennial College. Through academic projects, I have practiced Agile teamwork, quality assurance, and full-stack development. While I had opportunities to coordinate tasks in team projects, my greatest strength has been learning how to listen, follow guidance from more experienced teammates, and contribute reliably.
//         </Typography>
//         <Typography
//           variant="body1"
//           sx={{ fontSize: { xs: "1rem", md: "1.05rem" }, lineHeight: 1.8, textAlign: "justify" }}
//         >
//           My technical background includes Java, C#, JavaScript, SQL, MERN stack, and Oracle database projects. More importantly, I am committed to continuous learning, adapting to team needs, and supporting senior colleagues to ensure quality outcomes. As a junior tester, I focus on growing under the guidance of experienced professionals and contributing wherever the team needs me most.
//         </Typography>

//         <Stack direction="row" justifyContent="center" flexWrap="wrap" spacing={1} mt={2}>
//           <Chip label="Cypress & Selenium" variant="outlined" />
//           <Chip label="API · Postman" variant="outlined" />
//           <Chip label="MERN Stack" variant="outlined" />
//           <Chip label="Java · C# · SQL" variant="outlined" />
//           <Chip label="Agile / Scrum" variant="outlined" />
//         </Stack>
//       </Box>
//     </Container>
//   );
// };

// export default Home;

// ResumeHome.jsx
// import React from "react";
// import {
//   Container,
//   Box,
//   Typography,
//   Stack,
//   Button,
//   Link as MuiLink,
//   Divider,
//   Chip,
// } from "@mui/material";
// import { Link } from "react-router-dom";

// const brand = { main: "#3eb93e", dark: "#2a8a2a" };
// const Section = ({ title, children }) => (
//   <Box sx={{ my: { xs: 3, md: 6 } }}>
//     <Typography variant="h4" sx={{ fontWeight: 700, color: brand.main, mb: 2 }}>
//       {title}
//     </Typography>
//     {children}
//   </Box>
// );

// export default function ResumeHome() {
//   return (
//     <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
//       {/* Header */}
//       <Box sx={{ textAlign: "center", mb: 4 }}>
//         <Typography variant="h3" sx={{ fontWeight: 700, color: brand.main, mb: 1 }}>
//           Garam Yoon
//         </Typography>
//         <Typography variant="h6" sx={{ color: "text.secondary" }}>
//           Junior Software Quality Assurance Tester
//         </Typography>
//       </Box>

//       {/* Contact */}
//       <Stack
//         direction={{ xs: "column", sm: "row" }}
//         spacing={1.5}
//         justifyContent="center"
//         alignItems="center"
//         sx={{ mb: 3 }}
//       >
//         {/* <Typography variant="body2">(437) 425-5682</Typography> */}
//         <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" } }} />
//         <MuiLink href="mailto:rkfka9536@gmail.com" underline="hover">
//           rkfka9536@gmail.com
//         </MuiLink>
//         <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" } }} />
//         <MuiLink
//           href="https://www.linkedin.com/in/garam-yoon"
//           target="_blank"
//           rel="noopener"
//           underline="hover"
//         >
//           LinkedIn
//         </MuiLink>
//         <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" } }} />
//         <MuiLink
//           href="https://garamyoon-portfolio.onrender.com/project"
//           target="_blank"
//           rel="noopener"
//           underline="hover"
//         >
//           Sample Works
//         </MuiLink>
//       </Stack>

//       {/* CTAs */}
//       <Stack
//         direction={{ xs: "column", sm: "row" }}
//         spacing={1.5}
//         justifyContent="center"
//         sx={{ mb: { xs: 3, md: 4 } }}
//       >
//         <Button
//           component={Link}
//           to="/project"
//           variant="contained"
//           color="primary"
//           sx={{
//             textTransform: "none",
//             bgcolor: brand.main,
//             ":hover": { bgcolor: brand.dark },
//           }}
//         >
//           View Projects
//         </Button>
//         <Button
//           component="a"
//           href="/Resume.pdf"
//           target="_blank"
//           rel="noopener"
//           variant="outlined"
//           sx={{
//             textTransform: "none",
//             borderColor: brand.main,
//             color: brand.main,
//             ":hover": { borderColor: brand.dark, color: brand.dark },
//           }}
//         >
//           Download Resume
//         </Button>
//         <Button
//           component={Link}
//           to="/contact"
//           variant="outlined"
//           sx={{
//             textTransform: "none",
//             borderColor: brand.main,
//             color: brand.main,
//             ":hover": { borderColor: brand.dark, color: brand.dark },
//           }}
//         >
//           Contact
//         </Button>
//       </Stack>

//       {/* Skills */}
//       <Section title="Technical Skills">
//         <ul style={{ marginTop: 0, lineHeight: 1.8 }}>
//           <li>
//             <b>Testing & QA:</b> Manual, API, Automated, E2E, Regression, Test Case Design, Jira, Agile/Scrum
//           </li>
//           <li>
//             <b>Tools:</b> Postman, Thunder Client, JUnit, Selenium, Git, GitHub, CI/CD 
//           </li>
//           <li>
//             <b>Programming & Databases:</b> JavaScript (MERN), Java, C#, HTML, CSS, Oracle SQL, MongoDB
//           </li>
//         </ul>
//       </Section>

//       {/* Certifications & Awards */}
//       <Section title="Certifications & Awards">
//         <ul style={{ marginTop: 0, lineHeight: 1.8 }}>
//           <li>ISTQB CTFL</li>
//           <li>ISTQB Agile Tester (CTFL-AT)</li>
//           <li>
//             1st Place, Centennial College WILWorks Hackathon (2024): AI chatbot prototype (usability &
//             accessibility)
//           </li>
//         </ul>
//       </Section>

//       {/* Education */}
//       <Section title="Education">
//         <Box sx={{ mb: 2 }}>
//           <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
//             Centennial College, Software Engineering Technician
//           </Typography>
//           <Typography variant="body2" sx={{ color: "text.secondary" }}>
//             Coursework: Software Testing & QA, Web App Dev, Systems Design, Advanced DB (Oracle/NoSQL),
//             Unix/Linux, Java, C#, Discrete Math, Systems Fundamentals
//           </Typography>
//           <Typography variant="body2" sx={{ color: "text.secondary" }}>
//             Achievements: Cumulative GPA 4.34, Hackathon 1st (UI/UX Accessibility)
//           </Typography>
//         </Box>
//         <Box>
//           <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
//             Korea National University of Education
//           </Typography>
//           <Typography variant="body2" sx={{ color: "text.secondary" }}>
//             Strong documentation and communication skills from 3+ years of teaching
//           </Typography>
//         </Box>
//       </Section>
//     </Container>
//   );
// }


// ResumeSimple.jsx
import React from "react";
import {
  Container,
  Box,
  Typography,
  Stack,
  Button,
  Link as MuiLink,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import { Link } from "react-router-dom";

const brand = { main: "#3eb93e", dark: "#2a8a2a" };

// 재사용 섹션 컴포넌트: 헤더만 포인트 컬러
const Section = ({ title, children }) => (
  <Box sx={{ my: { xs: 4, md: 6 } }}>
    <Typography
      variant="h5"
      sx={{ fontWeight: 700, color: brand.main, mb: 2 }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export default function ResumeSimple() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      {/* 헤더 */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 800, color: brand.main, letterSpacing: -0.3, mb: 1 }}
        >
          Garam Yoon
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          Junior Software Quality Assurance Tester
        </Typography>
      </Box>

      {/* 연락/링크 라인 */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 3, color: "text.secondary" }}
      >
        <Typography variant="body2">Greater Toronto Area, Ontario</Typography>
        <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" } }} />
        <MuiLink href="mailto:rkfka9536@gmail.com" variant="body2" color="inherit" underline="none">
          rkfka9536@gmail.com
        </MuiLink>
        <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" } }} />
        <MuiLink
          href="https://www.linkedin.com/in/garam-yoon"
          variant="body2"
          color="inherit"
          underline="none"
          target="_blank"
          rel="noopener"
        >
          LinkedIn
        </MuiLink>
        <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" } }} />
        <MuiLink
          href="https://garamyoon-portfolio.onrender.com/project"
          variant="body2"
          color="inherit"
          underline="none"
          target="_blank"
          rel="noopener"
        >
          Sample Works
        </MuiLink>
      </Stack>

      {/* CTA 버튼 3개 */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.2}
        justifyContent="center"
        sx={{ mb: { xs: 4, md: 6 } }}
      >
        <Button
          component="a"
          href="/Resume.pdf"
          target="_blank"
          rel="noopener"
          variant="outlined"
          size="small"
          sx={{
            textTransform: "none",
            borderColor: brand.main,
            color: brand.main,
            ":hover": { borderColor: brand.dark, color: brand.dark },
            px: 2.5,
          }}
        >
          Download Resume
        </Button>
        <Button
          component={Link}
          to="/contact"
          variant="outlined"
          size="small"
          sx={{
            textTransform: "none",
            borderColor: brand.main,
            color: brand.main,
            ":hover": { borderColor: brand.dark, color: brand.dark },
            px: 2.5,
          }}
        >
          Contact
        </Button>
      </Stack>

      {/* Technical Skills */}
      <Section title="Technical Skills">
        <List dense sx={{ pl: 2, lineHeight: 1.8 }}>
          <ListItem sx={{ display: "list-item", pl: 0 }}>
            <b>Testing & QA:</b>&nbsp;Manual, API, Automated, E2E, Regression, Test Case Design, Jira, Agile/Scrum
          </ListItem>
          <ListItem sx={{ display: "list-item", pl: 0 }}>
            <b>Tools:</b>&nbsp;Postman, Thunder Client, JUnit, Selenium, Git, GitHub, CI/CD, Excel, Confluence
          </ListItem>
          <ListItem sx={{ display: "list-item", pl: 0 }}>
            <b>Programming & Databases:</b>&nbsp;JavaScript (MERN), Java, C#, HTML, CSS, Oracle SQL, MongoDB
          </ListItem>
           <ListItem sx={{ display: "list-item", pl: 0 }}>
            <b>Other Skills:</b>&nbsp; Strong communication, documentation, and teamwork skills, continuous learning in software quality assurance.
          </ListItem>
        </List>
      </Section>

      {/* Certifications */}
      <Section title="Certifications & Awards">
        <List dense sx={{ pl: 2, lineHeight: 1.8 }}>
          <ListItem sx={{ display: "list-item", pl: 0 }}>
            ISTQB CTFL <span>&nbsp;|&nbsp;</span>
            <Typography component="span" variant="body2" sx={{ fontStyle: 'italic', fontWeight: 'normal', color: 'text.secondary' }}>September 2025</Typography>
          </ListItem>
          <ListItem sx={{ display: "list-item", pl: 0 }}>
            ISTQB Agile Tester (CTFL-AT) <span>&nbsp;|&nbsp;</span>
            <Typography component="span" variant="body2" sx={{ fontStyle: 'italic', fontWeight: 'normal', color: 'text.secondary' }}>October 2025</Typography>
          </ListItem>
          <ListItem sx={{ display: "list-item", pl: 0 }}>
            1st Place, Centennial College WILWork Hackathon <span>&nbsp;|&nbsp;</span>
            <Typography component="span" variant="body2" sx={{ fontStyle: 'italic', fontWeight: 'normal', color: 'text.secondary' }}>November 2024</Typography>
          </ListItem>
        </List>
      </Section>

      {/* Education */}
      <Section title="Education">
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Centennial College, Software Engineering Technician
            <Typography component="span" sx={{ fontStyle: 'italic', fontWeight: 'normal', color: 'text.secondary', ml: 1 }}>
              | August 2024 - December 2025
            </Typography>
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Coursework: Software Testing & QA, Web App Dev, Systems Design, Advanced DB (Oracle/NoSQL),
            Unix/Linux, Java, C#, Discrete Math, Systems Fundamentals
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Achievements: Cumulative GPA 4.34, Hackathon 1st (UI/UX Accessibility)
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Korea National University of Education
            <Typography component="span" sx={{ fontStyle: 'italic', fontWeight: 'normal', color: 'text.secondary', ml: 1 }}>
              | March 2017 - February 2021
            </Typography>
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Strong documentation and communication skills from 3+ years of teaching
          </Typography>
        </Box>
      </Section>
    </Container>
  );
}
