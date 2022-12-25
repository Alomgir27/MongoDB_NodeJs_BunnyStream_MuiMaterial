import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material";

import "./ChipTags.css";

const ChipTags = ({
  word,
  getSelectedWord,
  wordFromChipTag,
  wordFromChipBar, // The word which is sent up to App.js to change the queryStr, it is sent backdown to chipTags to edit the className
}) => {
  const theme = useTheme();
  const handleClick = () => {
    window.scrollTo(0, 0);
    getSelectedWord(word);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label={capitalizeFirstLetter(word)}
        onClick={handleClick}
        className={
          wordFromChipTag === word && wordFromChipTag === wordFromChipBar
            ? "active chip"
            : "chip"
        }
        sx={{
          backgroundColor: theme.palette.mode === "dark" ? "#212121" : "#fff",
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
          border: "1px solid #343434",
          "&:hover": {
            backgroundColor: theme.palette.mode === "dark" ? "#212121" : "#fff",
            color: theme.palette.mode !== "dark" ? "#fff" : "#000",
            border: "1px solid #343434",
          }, 
        }}
      />
    </Stack>
  );
};

export default ChipTags;
