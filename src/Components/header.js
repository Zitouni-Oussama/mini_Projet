import React, { useState, useEffect } from "react";
import { AppBar, Box, Divider, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [Logo, setLogo] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    const cssFile = storedTheme === "light" ? "/Css/header2.css" : "/Css/header.css";
    setLogo(storedTheme === "light" ? "/images/logo2.svg" : "/images/logo.svg");
    // Vérifiez si un lien avec ce href existe déjà
    const existingLink = document.querySelector(`link[href="${cssFile}"]`);
    if (!existingLink) {
      // Dynamically add the CSS file to the document
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssFile;
      document.head.appendChild(link);

      // Cleanup function to remove the CSS file if the component unmounts
      return () => {
        document.head.removeChild(link);
      };
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box id='drawer_back' onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        color={"goldenrod"}
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, my: 2 }}
      >
        <img src={Logo} alt="logo" height={"70"} width="200" />
      </Typography>
      <Divider />
      <ul className="mobile-navigation">
        <li>
          <NavLink activeClassName="active" to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/add"}>Add</NavLink>
        </li>
        <li>
          <NavLink to={"/list"}>List</NavLink>
        </li>
        <li>
          <NavLink to={"/reports"}>Reports</NavLink>
        </li>
        <li>
          <NavLink to={"/settings"}>Settings</NavLink>
        </li>
      </ul>
    </Box>
  );

  return (
    <>
      <Box>
        {/* AppBar: Main Menu */}
        <AppBar id="app_bar" component={"nav"}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{
                mr: 2,
                display: { xs: "block", sm: "none" }, // Display only on mobile
              }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              color={"goldenrod"}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <img src={Logo} alt="logo" height={"70"} width="250" />
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul className="navigation-menu">
                <li>
                  <NavLink activeClassName="active" to={"/"}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={"/add"}>Add</NavLink>
                </li>
                <li>
                  <NavLink to={"/list"}>List</NavLink>
                </li>
                <li>
                  <NavLink to={"/reports"}>Reports</NavLink>
                </li>
                <li>
                  <NavLink to={"/settings"}>Settings</NavLink>
                </li>
              </ul>
            </Box>
          </Toolbar>
        </AppBar>

        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "240px",
                color: "white",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>

        <Box>
          <Toolbar />
        </Box>
      </Box>
    </>
  );
};

export default Header;
