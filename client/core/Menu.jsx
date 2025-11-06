import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import auth from "../lib/auth-helper";
import { Link, useNavigate, useLocation } from "react-router-dom";

const ACTIVE_COLOR = "#3eb96bff";
const INACTIVE_COLOR = "#000000";

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = (open) => () => setMobileOpen(open);

  const go = (path) => {
    setMobileOpen(false);
    navigate(path);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
        backgroundColor: { xs: 'transparent', md: mobileOpen ? 'transparent' : '#ffffff' },
        color: '#000000',
        width: '100%',
        borderBottom: { xs: 'none', md: mobileOpen ? 'none' : '1px solid #eee' },
        boxShadow: { xs: 'none', md: mobileOpen ? 'none' : undefined },
        display: mobileOpen ? 'none' : 'block'
      }}
    >
      {!mobileOpen && (
      <Toolbar sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        minHeight: { xs: 64, sm: 72, md: 88 },
        px: { xs: 1, sm: 2, md: 3 }
      }}>
  <Typography variant="h2" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
          <Link to="/" style={{
            textDecoration: "none", 
            color: location.pathname === "/" ? ACTIVE_COLOR : INACTIVE_COLOR,
            display: 'inline-block',
            transition: 'transform 0.2s ease',
          }}>
            {/* <img 
              src={"/custom-logo.png"} 
              alt="Logo" 
              style={{ 
                borderRadius: "50px", 
                marginTop: 8,
                marginLeft: 12,
                height: 56,
                maxWidth: '100%',
                transition: 'transform 0.5s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.2)'}
              onMouseDown={(e) => e.target.style.transform = 'scale(1.2)'}
              onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            /> */}
          </Link>
        </Typography>

        {/* Desktop nav */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
          <Link to="/">
            <Button sx={{
              color: location.pathname === "/" ? ACTIVE_COLOR : INACTIVE_COLOR,
              fontSize: '1.05rem',
              '&:hover': { color: "#3eb96bff", backgroundColor: '#ffffff' },
              transition: 'color 0.2s ease'
            }}>
              Home
            </Button>
          </Link>
          <Link to="/project">
            <Button sx={{
              color: location.pathname === "/project" ? ACTIVE_COLOR : INACTIVE_COLOR,
              fontSize: '1.05rem',
              '&:hover': { color: "#3eb96bff", backgroundColor: '#ffffff' },
              transition: 'color 0.2s ease'
            }}>
              Works
            </Button>
          </Link>
          <Button
            component="a"
            href="https://www.notion.so/1e097141ccc38075bc31eb034c0910ef?v=1e097141ccc380219636000c91bf3741"
            sx={{
              color: INACTIVE_COLOR,
              fontSize: '1.05rem',
              '&:hover': { color: "#3eb96bff", backgroundColor: '#ffffff' },
              transition: 'color 0.2s ease'
            }}
          >
            Blog
          </Button>
          {/* <Link to="/about">
            <Button sx={{
              color: location.pathname === "/about" ? ACTIVE_COLOR : INACTIVE_COLOR,
              fontSize: '1.05rem',
              '&:hover': { color: "#3eb96bff", backgroundColor: '#ffffff' },
              transition: 'color 0.2s ease'
            }}>
              About
            </Button>
          </Link> */}
          <Link to="/contact">
            <Button sx={{
              color: location.pathname === "/contact" ? ACTIVE_COLOR : INACTIVE_COLOR,
              fontSize: '1.05rem',
              '&:hover': { color: "#3eb96bff", backgroundColor: '#ffffff' },
              transition: 'color 0.2s ease'
            }}>
              Contact
            </Button>
          </Link>

          {/* Admin Only - Users Tab */}
          {auth.isAuthenticated() && auth.isAuthenticated().user.admin && (
            <Link to="/users">
              <Button sx={{
                color: location.pathname === "/users" ? ACTIVE_COLOR : INACTIVE_COLOR,
                fontSize: '1.05rem',
                '&:hover': { color: "#3eb96bff", backgroundColor: '#ffffff' },
                transition: 'color 0.2s ease'
              }}>
                Users
              </Button>
            </Link>
          )}

          {/* Hide Sign in/up per request */}

          {auth.isAuthenticated() && (
            <>
              <Link to={`/user/${auth.isAuthenticated().user._id}`}>
                <Button
                  sx={{
                    color: (location.pathname === `/user/${auth.isAuthenticated()?.user?._id}`) ? ACTIVE_COLOR : INACTIVE_COLOR,
                    fontSize: '1.05rem',
                    '&:hover': { color: "#3eb96bff", backgroundColor: '#ffffff' },
                    transition: 'color 0.2s ease'
                  }}
                >
                  My Profile
                </Button>
              </Link>
              <Button
                sx={{ 
                  color: INACTIVE_COLOR, 
                  fontSize: '1.05rem', 
                  '&:hover': { color: "#3eb96bff", backgroundColor: '#ffffff' },
                  transition: 'color 0.2s ease'
                }}
                onClick={() => {
                  auth.completeLogout(() => navigate("/"));
                }}
              >
                Sign out
              </Button>
            </>
          )}
        </Box>

        {/* Mobile spacer to push hamburger to the right on small screens */}
        <Box sx={{ flexGrow: 1, display: { xs: 'block', md: 'none' } }} />
        {/* Mobile hamburger */}
        <Box sx={{ display: { xs: 'inline-flex', md: 'none' } }}>
          <IconButton aria-label="open navigation" onClick={toggleMobile(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
      )}

      <Drawer 
        anchor="right" 
        open={mobileOpen} 
        onClose={toggleMobile(false)}
        PaperProps={{ sx: { width: { xs: 300, sm: 360 }, height: '100%', borderRadius: 0 } }}
        ModalProps={{ keepMounted: true }}
      >
        <Box sx={{ width: { xs: 300, sm: 360 } }} role="presentation" onClick={toggleMobile(false)} onKeyDown={toggleMobile(false)}>
          <List>
            <ListItem disablePadding>
              <ListItemButton 
                selected={location.pathname === "/"} 
                onClick={() => go('/')}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'transparent',
                    color: ACTIVE_COLOR
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(62, 185, 107, 0.08)',
                    color: ACTIVE_COLOR
                  },
                  color: location.pathname === "/" ? ACTIVE_COLOR : INACTIVE_COLOR,
                  transition: 'color 0.2s ease'
                }}
              > 
                <HomeIcon sx={{ mr: 1 }} />
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            {/* Removed Services and All from mobile menu */}
            <ListItem disablePadding>
              <ListItemButton 
                selected={location.pathname === "/project"} 
                onClick={() => go('/project')}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'transparent',
                    color: ACTIVE_COLOR
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(62, 185, 107, 0.08)',
                    color: ACTIVE_COLOR
                  },
                  color: location.pathname === "/project" ? ACTIVE_COLOR : INACTIVE_COLOR,
                  transition: 'color 0.2s ease'
                }}
              >
                <ListItemText primary="Works" primaryTypographyProps={{ sx: { textTransform: 'none' } }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton 
                component="a" 
                href="https://www.notion.so/1e097141ccc38075bc31eb034c0910ef?v=1e097141ccc380219636000c91bf3741"
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(62, 185, 107, 0.08)',
                    color: ACTIVE_COLOR
                  },
                  color: INACTIVE_COLOR,
                  transition: 'color 0.2s ease'
                }}
              >
                <ListItemText primary="Blog" primaryTypographyProps={{ sx: { textTransform: 'none' } }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton 
                selected={location.pathname === "/contact"} 
                onClick={() => go('/contact')}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'transparent',
                    color: ACTIVE_COLOR
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(62, 185, 107, 0.08)',
                    color: ACTIVE_COLOR
                  },
                  color: location.pathname === "/contact" ? ACTIVE_COLOR : INACTIVE_COLOR,
                  transition: 'color 0.2s ease'
                }}
              >
                <ListItemText primary="Contact" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            {auth.isAuthenticated() && auth.isAuthenticated().user?.admin && (
              <ListItem disablePadding>
                <ListItemButton 
                  selected={location.pathname === "/users"} 
                  onClick={() => go('/users')}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'transparent',
                      color: ACTIVE_COLOR
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(62, 185, 107, 0.08)',
                      color: ACTIVE_COLOR
                    },
                    color: location.pathname === "/users" ? ACTIVE_COLOR : INACTIVE_COLOR,
                    transition: 'color 0.2s ease'
                  }}
                >
                  <ListItemText primary="Users" />
                </ListItemButton>
              </ListItem>
            )}

            {auth.isAuthenticated() ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton 
                    selected={location.pathname.startsWith(`/user/`)} 
                    onClick={() => go(`/user/${auth.isAuthenticated().user._id}`)}
                    sx={{
                      '&.Mui-selected': {
                        backgroundColor: 'transparent',
                        color: ACTIVE_COLOR
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(62, 185, 107, 0.08)',
                        color: ACTIVE_COLOR
                      },
                      color: location.pathname.startsWith(`/user/`) ? ACTIVE_COLOR : INACTIVE_COLOR,
                      transition: 'color 0.2s ease'
                    }}
                  >
                    <ListItemText primary="My Profile" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => auth.completeLogout(() => go('/'))}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(62, 185, 107, 0.08)',
                        color: ACTIVE_COLOR
                      },
                      color: INACTIVE_COLOR,
                      transition: 'color 0.2s ease'
                    }}
                  >
                    <ListItemText primary="Sign out" />
                  </ListItemButton>
                </ListItem>
              </>
            ) : null}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}


