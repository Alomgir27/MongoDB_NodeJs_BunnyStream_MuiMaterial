import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import SideBar from "../SideBar/SideBar";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";



import "./PrimarySearchAppBar.css";
import { Avatar, Divider } from "@mui/material";
import { Logout, VideoLibrary } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#181818",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));


const PrimarySearchAppBar = ({  clearVideoData, toggleTheme}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);


  const navigate = useNavigate();


  const [user, setUser] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleChange = (e) => {
    if (e.keyCode === 13) {
      const query = e.target.value;
      navigate(`/search/${query}`);
    }
  };

  const clearQueryString = () => {
    clearVideoData(null);
  };

  const handleLogOut = async () => {
    await axios.post("http://localhost:27017/api/users/logout")
    .then((res) => {
      console.log(res);
      localStorage.removeItem("user");
      window.location.reload();
    }
    )
    .catch((err) => console.log(err));
  };

   




  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to={`/about/${user?.userId}&1`} style={{ textDecoration: "none" }}>
          <Avatar 
          alt={user?.name} 
          src={user?.url}
          sx={{
            width: "2rem",
            height: "2rem",
          }}
           />
        </Link>
        <Link to={`/about/${user?.userId}&1`} style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ 
              display: { xs: "none", sm: "block" },
              color: theme.palette.primary.main,
              marginLeft: "1rem",
              fontSize: "1rem",
            }}
          >
            {user?.name}
          </Typography>
        </Link>
      </MenuItem>
      {/* create same for my Media */}
      <MenuItem onClick={handleMenuClose}>
        {/* Add a icon for related to My media */}
        <VideoLibrary sx={{ 
          color:theme.palette.primary.main,
          marginRight: "1rem",
        }}/>

        <Link to={`/about/${user?.userId}&2`} style={{
          textDecoration: "none",
          display: "flex",
          color:  theme.palette.primary.main,
          alignItems: "center",
        }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" },
            color:  theme.palette.primary.main,
            fontSize: "1rem",

           }}
          >
            My Media
          </Typography>
        </Link>
      </MenuItem>
      
      
      
      <Divider
        sx={{
          backgroundColor: theme.palette.primary.main,
          margin: "1rem 0",
        }} 
      />
      <MenuItem onClick={handleLogOut}>
        <Logout sx={{
          color: theme.palette.primary.main,
          marginRight: "1rem",
        }}/>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ 
              display: { xs: "none", sm: "block" },
              color:  theme.palette.primary.main,
              fontSize: "1rem",

             }}
          >
            Logout
          </Typography>
      </MenuItem>
      

    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {!user ? (
      <>
      <MenuItem>
       <Link to="/signin" style={{ 
        textDecoration: "none",
        display: "flex",
        color: theme.palette.primary.contrastText,
        alignItems: "center",
         }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Sign In
          </Typography>
        </Link>
      </MenuItem>
      <MenuItem>

        <Link to="/signup" style={{ 
          textDecoration: "none", 
          display: "flex",
          color: theme.palette.primary.contrastText,
          alignItems: "center",

          }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Sign Up
          </Typography>
        </Link>
       
      </MenuItem>
      </>
      ) : (
      <>
      
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle s
            sx={{
              color: theme.palette.primary.main,
            }}
          />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      </>
      )}
    </Menu>
  );

  return (
    <>
    <Box
      sx={{
        flexGrow: 1,
        position: "fixed",
        width: "100%",
        zIndex: "100",
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[100],
          height: 60,
          boxShadow: "none",
          borderBottom: "1px solid #1db954",
          justifyContent: "center",
          alignItems: "space-around",
        }}
      >
        <Toolbar>
          <Typography
            sx={{
              color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900],
              marginRight: "27px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              userSelect: "none",
              textDecoration: "none",
            }}
          >
            <SideBar toggleTheme={toggleTheme} />
          </Typography>
          <div className="goHome">
           <Link 
           to="/" 
           style={{
            color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900],
            fontSize: "25px", 
            fontWeight: "bold",
            cursor: "pointer",
            userSelect: "none",
            textDecoration: "none",

            }}
            >
            Media<span 
            style={{
             color: "#1db954",
              fontSize: "25px",
              fontWeight: "bold",
              cursor: "pointer",
              userSelect: "none",
              textDecoration: "none",
            }}
            >CMS</span>
            </Link>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Search className="searchBar"
            sx={{
              position: "relative",
              borderRadius: "0px",
              backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[300],
              "&:hover": {
                backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[300],
              },
              width: "100%",
              [theme.breakpoints.up("sm")]: {
                marginLeft: theme.spacing(1),
                width: "auto",
              },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon style={{ color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900] }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
              sx={{ 
                color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900],
                borderRadius: "0px",
                border:"1px solid #1db954",
                height: "35px",
                fontSize: "20px",
                fontWeight: "semibold",
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "700px",
              }}
              autoFocus
              fullWidth={true}
              onKeyDown={handleChange}
              className="searchBarInput"
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
        
          <Box sx={{ display: { xs: "none", md: "flex" } }} >
          {!user ? (
            <>
            <Link to="/signin" 
            style={{
              textDecoration: "none", 
              color: "#1db954",
              cursor: "pointer",
              userSelect: "none",
              marginRight: "20px",
              fontSize: "20px",
              fontWeight: "bold",

            }}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Sign In
              </Typography>
            </Link>

            <Link to="/signup"
            style={{
              textDecoration: "none",
              color: "#1db954",
              cursor: "pointer",
              userSelect: "none",
              marginRight: "20px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Sign Up
              </Typography>
            </Link>
            </>
          ) : (
            <>
             <MenuItem>
             <Link to="/upload"
              style={{
                textDecoration: "none",
                cursor: "pointer",
                userSelect: "none",
                fontSize: "20px",
                fontWeight: "bold",
                justifyContent: "center",
                alignItems: "center",
                color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900],
              }}
              >
              <VideoCallIcon 
              style={{ color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900] }}
               />
              </Link>

                
            </MenuItem>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle 
              style={{ color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900] }}
              />
            </IconButton>
            </>
          )}
          </Box>
          <Box 
          className="mobileMenu"
          sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
          >
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon 
              style={{ color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900] }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
     
    </>
  );
};

export default PrimarySearchAppBar;
