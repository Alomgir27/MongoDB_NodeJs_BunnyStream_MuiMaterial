import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChipTags from "./ChipTags";
import { useMediaQuery } from "react-responsive";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@mui/material";



import "./ChipBar.css";

const ChipBar = ({ getWordFromChipBar, wordFromChipBar }) => {
  const [randomWordArray, setRandomWordArray] = useState([]);
  const [wordFromChipTag, setWordFromChipTag] = useState("");
  const theme = useTheme();

  const [searchTag, setSearchTag] = useState("Bangladesh");

  const isSmallerScreen = useMediaQuery({ query: "(max-width: 800px)" });

  const toolbarRef = useRef(null);

  useEffect(() => {
    const getRandomWords = async () => {
      const res = await fetch(
        `https://random-words5.p.rapidapi.com/getMultipleRandom?count=20`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "random-words5.p.rapidapi.com",
            "x-rapidapi-key":
              "2895577f1amshc0eab35c83a8b00p17ae26jsnfc082aac1ef7",
          },
          
        }
      );

      const data = await res.json();

      setRandomWordArray(data);
    };

    getRandomWords();
  }, []);

  const addMoreWords = async () => {
    const res = await fetch(
      `https://random-words5.p.rapidapi.com/getMultipleRandom?count=20`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "random-words5.p.rapidapi.com",
          "x-rapidapi-key":
          '2895577f1amshc0eab35c83a8b00p17ae26jsnfc082aac1ef7',
        },
      }
    );

    const data = await res.json();

    setRandomWordArray([...randomWordArray, ...data]);
  };


 
        


  const getSelectedWord = (wordFromChipTags) => {
    setWordFromChipTag(wordFromChipTags);
    getWordFromChipBar(wordFromChipTags);
  };

  const resetWordFromChipTags = () => {
    window.scrollTo(0, 0);
    getWordFromChipBar("");
    setWordFromChipTag("");
  };

  return (
    <div className="mainBar">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: theme.palette.mode === "dark" ? "#212121" : "#fff",
            width: "100%",
            borderBottom: "1.5px solid #343434",
            borderTop: "1.5px solid #343434",
            boxShadow: "none",
          }}
        >
          
          <Toolbar variant="dense"
            sx={{
              width: "100%",
              height: 45,
              backgroundColor: theme.palette.mode === "dark" ? "#212121" : "#fff",
              overflowX: "scroll",
              overflowY: "hidden",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar-track": {
                display: "none",
              },
              "&::-webkit-scrollbar-thumb": {
                display: "none",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                display: "none",
              },
              transition: "all 0.5s ease",
              animation: "slideIn 0.5s ease",
              "@keyframes slideIn": {
                "0%": {
                  transform: "translateX(-100%)",
                },
                "100%": {
                  transform: "translateX(0)",
                },
                animationFillMode: "forwards",

              },
              animationFillMode: "forwards",
              animationDuration: "0.5s",
              animationTimingFunction: "ease",
              animationDelay: ".5s",
              animationIterationCount: "1",
              animationDirection: "normal",
              


            }}
            onScroll={(e) => {
              if ( e.target.scrollWidth - e.target.scrollLeft <= e.target.clientWidth + 1) {
                addMoreWords();
              }
              console.log(e.target.scrollWidth - e.target.scrollLeft, e.target.clientWidth);
            }}
            onClick={() => {
              if (isSmallerScreen) {
                window.scrollTo(0, 0);
              }
            }}
            ref={toolbarRef}
          >
            <Chip
              label="All"
              className={
                wordFromChipTag !== wordFromChipBar 
                  ? "active"
                  : "chip"
              }
              onClick={resetWordFromChipTags}
              sx={{
                marginLeft: 10,
              }}
            />
            {randomWordArray?.map((word, i) => (
              <ChipTags
                word={word}
                getSelectedWord={getSelectedWord}
                key={i}
                wordFromChipTag={wordFromChipTag}
                wordFromChipBar={wordFromChipBar}
              />
            ))}
          </Toolbar>
          {toolbarRef.current?.scrollLeft > 200 && (
          <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                position: "absolute",
                backgroundColor: theme.palette.mode === "dark" ? "#212121ee" : "#6f6f6fee",
                "&:hover": {
                  backgroundColor: theme.palette.mode !== "dark" ? "#212121ee" : "#6f6f6fee",
                },
                height: 45,
                left: 0,
                width: 70,
                borderRadius: 0,
              }}
              className="chevronLeft"
              onClick={() => {
                toolbarRef.current.scrollLeft -= 200;
              }}
            >
              <ChevronLeftIcon/>
            </IconButton>
          )}
          <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                position: "absolute",
                backgroundColor: theme.palette.mode === "dark" ? "#212121ee" : "#6f6f6fee",
                "&:hover": {
                  backgroundColor: theme.palette.mode !== "dark" ? "#212121ee" : "#6f6f6fee",
                },
                height: 45,
                right: 0,
                width: 70,
                borderRadius: 0,
              }}
              className="chevronRight"
              onClick={() => {
                toolbarRef.current.scrollLeft += 200;
              }}
            >
              <ChevronRightIcon />
            </IconButton>
        </AppBar>
      </Box>
    </div>
  );
};

export default ChipBar;
