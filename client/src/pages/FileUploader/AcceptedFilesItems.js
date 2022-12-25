import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  CircularProgress
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";

const AcceptedFilesItems = ({ acceptedFiles, onDelete }) => {
  return (
    <List dense sx={{ maxHeight: "250px", overflow: "auto" }}>
      {acceptedFiles.map((file) => (
        <ListItem
          key={file.name}
          divider
          secondaryAction={
            file.status === "uploading" ? (
              <CircularProgress size="1em" />
            ) : (
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(file);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )
          }
        >
          <ListItemIcon>
            <UploadFileIcon color="success" fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={file.name}
            secondary={file.status === "uploaded" && "Uploaded"}
            secondaryTypographyProps={{ color: "success.main" }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default AcceptedFilesItems;
