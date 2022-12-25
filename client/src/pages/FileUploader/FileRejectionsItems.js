import React from "react";
import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const FileRejectionItems = ({ fileRejections }) => (
  <List dense sx={{ maxHeight: "250px", overflow: "auto" }}>
    {fileRejections.map(({ file, errors }) => (
      <React.Fragment key={file.path}>
        <ListItem key={file.path}>
          <ListItemIcon>
            <UploadFileIcon color="error" fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={file.path}
            secondary={errors.map((e) => (
              <Typography
                key={file.path + e.code}
                variant="overline"
                color="error"
                sx={{
                  "& + .MuiTypography-root::before": {
                    display: "inline-block",
                    whiteSpace: "pre",
                    content: '", "'
                  }
                }}
              >
                {e.message}
              </Typography>
            ))}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </React.Fragment>
    ))}
  </List>
);

export default FileRejectionItems;
