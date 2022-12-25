import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useTheme } from "@mui/material/styles";
import { Link } from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CardMembershipOutlinedIcon from "@mui/icons-material/CardMembershipOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import PlaylistPlayOutlinedIcon from "@mui/icons-material/PlaylistPlayOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { useNavigate } from "react-router-dom";

import "./SideBar.css";


const MaterialUISwitch = styled(Switch)(({ theme }) => {
  return {
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be"
        }
      }
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
      }
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2
    }
  };
});



const SideBar = ({ toggleTheme }) => {
  const [state, setState] = useState(true);
  const [youtubeObj, setYoutubeObj] = useState([]);
  const navigate = useNavigate();

  const theme = useTheme();


  const queryStr = "WorldCup";

  useEffect(() => {
    const getYoutubeVidObject = async () => {
      const res = await fetch(
        `https://youtube-v31.p.rapidapi.com/search?q=${queryStr}&part=snippet%2Cid&regionCode=US&maxResults=7&order=date`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
            "x-rapidapi-key":
              "2895577f1amshc0eab35c83a8b00p17ae26jsnfc082aac1ef7",
          },
        }
      );

      const data = await res.json();

      setYoutubeObj(data.items);
    };

    getYoutubeVidObject();
  }, [queryStr]);

  const objectSnippet = youtubeObj.map((obj) => {
    return obj.snippet;
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const menuOptions = [
    ["Home", <HomeIcon sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }} />],
    ["Recommended", <ThumbUpAltOutlinedIcon sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }}  />],
    ["Recently Added", <AddCircleOutlineOutlinedIcon sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }} />],
    ["Tags", <LocalOfferOutlinedIcon sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }} />],
    ["Categories", <CategoryOutlinedIcon sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }} />],
    ["Memberships", <CardMembershipOutlinedIcon sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }} />],
    ["Uploads Media", <CloudUploadOutlinedIcon sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }} />],
    ["My Media", <PhotoLibraryOutlinedIcon sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }} />],
    ["Playlists", <PlaylistPlayOutlinedIcon sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }} />],
    ["History", <HistoryOutlinedIcon sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }} />],
    ["Liked Videos", <ThumbUpAltOutlinedIcon sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }} />],
    ["About", <InfoOutlinedIcon sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }} />],
    ["Terms", <AssignmentOutlinedIcon sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }} />],
    ["Subscriptions", <SubscriptionsOutlinedIcon sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }} />],
    ["Send feedback", <FeedbackOutlinedIcon sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }} />],
  ];

  const options = {
    "Home": "/",
    "Recommended": "/recommended",
    "Recently Added": "/recently-added",
    "Tags": "/tags",
    "Categories": "/categories",
    "Memberships": "/memberships",
    "Uploads Media": "/upload",
    "My Media": "/my-media",
    "Playlists": "/playlists",
    "History": "/history",
    "Liked Videos": "/liked-videos",
    "About": "/about",
    "Terms": "/terms",
    "Subscriptions": "/subscriptions",
    "Send feedback": "/send-feedback",
  }
  

 

  const list = (anchor) => (
    <Box
      sx={{
        width: 270,
        height: "100%",
        overflowY: "scroll",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="burgerMenu">
        <MenuIcon sx={{ 
          color: `${theme.palette.mode === "dark" ? "#fff" : "#000"}`,
           mt: 2.5, ml: 2, 
           mb: 3 }} />
          <Link to="/"
            style={{
              color: theme.palette.mode === "dark" ? "#fff" : "#000",
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginLeft: "1rem",
              marginTop: "1rem",
              textDecoration: "none"

            }}
            
          >
          Media
          <span style={{
             color: "#1db954",
              fontSize: "25px",
              fontWeight: "bold",
              cursor: "pointer",
              userSelect: "none",
              textDecoration: "none",
            }}>
              CMS
            </span>
          </Link>
      </div>

      <List>
        {menuOptions.slice(0, 6).map(([label, Icon], i) => (
          <div
            className={`${
               "listItems2"
            }`}
            key={i}
            onClick={() => navigate(options[label])}
          >
            <ListItem button key={label}>
              <ListItemIcon>{Icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </div>
        ))}
      </List>
      <Divider sx={{ backgroundColor: "#2c2c2c" }} />

      <List>
        {menuOptions.slice(6, 9).map(([label, Icon], index) => (
          <div className="listItems2" key={index}  onClick={() => navigate(options[label])} >
            <ListItem button key={label}>
              <ListItemIcon>{Icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </div>
        ))}
      </List>
      <Divider sx={{ backgroundColor: "#2c2c2c" }} />
      <Typography
        variant="subtitle2"
        noWrap
        component="div"
        sx={{
          ml: 3,
          mt: 2,
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
          fontWeight: "bolder",
          letterSpacing: "1px",
        }}
      >
        SUBSCRIPTIONS
      </Typography>
      <List>
        {objectSnippet.map((snippet, i) => (
          <div className="listItems2" key={i}
          >
            <ListItem button key={i}>
              <ListItemIcon>
                <img
                  src={snippet.thumbnails.high.url}
                  className="imagesForChannelSubs"
                  alt=""
                />
              </ListItemIcon>
              <ListItemText primary={snippet.channelTitle} />
            </ListItem>
          </div>
        ))}
        <div className="listItems2">
          <ListItem button>
            <ListItemIcon>
              <KeyboardArrowDownOutlinedIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Show More" />
          </ListItem>
        </div>
      </List>
      <Divider sx={{ backgroundColor: "#2c2c2c" }} />
      <Typography
        variant="subtitle2"
        noWrap
        component="div"
        sx={{
          ml: 3,
          mt: 2,
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
          fontWeight: "bolder",
          letterSpacing: "1px",
        }}
      >
        MORE FROM MediaCMS
      </Typography>
      <List>
        {menuOptions.slice(9, 13).map(([label, Icon], index) => (
          <div className="listItems2" key={index}
          onClick={() => navigate(options[label])}

          >
            <ListItem button key={label}>
              <ListItemIcon>{Icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </div>
        ))}
      </List>
      <Divider sx={{ backgroundColor: "#2c2c2c", fontWeight: "bolder" }} />
      <List>
        {menuOptions.slice(13, 18).map(([label, Icon], index) => (
          <div className="listItems2" key={index}
          onClick={() => navigate(options[label])}
          >
            <ListItem button key={label}>
              <ListItemIcon>{Icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </div>
        ))}
      </List>

      <Divider sx={{ backgroundColor: "#2c2c2c" }} />
      
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1rem" }}>
        <Typography
          variant="subtitle2"
          noWrap
          component="div"
          sx={{
            color: "#6c6c6c",
            fontSize: "12px",
          }}
        >
        <FormGroup>
          <FormControlLabel
            control={<MaterialUISwitch sx={{ m: 1 }} 
            defaultChecked={theme.palette.mode === "dark" ? true : false}
            />}
            label={theme.palette.mode === "dark" ? "Dark Mode" : "Light Mode"}
            onClick={toggleTheme}
          />
        </FormGroup>
        </Typography>
      </div>


      

      <Typography
        variant="subtitle2"
        noWrap
        component="div"
        sx={{
          m: 3,
          color: "#6c6c6c",
          fontSize: "12px",
        }}
      >
        ©{new Date().getFullYear()} privacy policy terms of service
      </Typography>
    </Box>
  );

  return (
    <div className="sideBarBurgerMenu">
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Typography variant="h6" component="div" sx={{ 
            flexGrow: 1 ,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            userSelect: "none",
            textDecoration: "none",
            
          }} onClick={toggleDrawer(anchor, true)}>
            <MenuIcon sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }} 
            />
          </Typography>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SideBar;
