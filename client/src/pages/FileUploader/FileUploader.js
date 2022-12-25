// import { useCallback, useState, useEffect } from "react";
import { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileRejectionItems from "./FileRejectionsItems";
import AcceptedFilesItems from "./AcceptedFilesItems";
import * as S from "./styles";

const FileUploader = ({
  multiFile,
  onChange,
  content,
  containerSx,
  allowedExtensions,
  maxFiles: _maxFiles,
  customValidator,
  onUpload,
  onConfirm
}) => {
  const [files, setFiles] = useState([]);
  const maxFiles = multiFile ? _maxFiles : 1;
  const [isloaded, setIsLoaded] = useState(false);

 
 


  const onDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = [
        ...acceptedFiles,
        ...files.map((file) => {
          const newFile = new File([file], file.name);
          Object.defineProperty(newFile, "status", {
            value: "idle",
            writable: true
          });
          return newFile;
        })
      ];
      setFiles(newFiles);

      onUpload(newFiles);
      setIsLoaded(true);
    


      if (onChange && typeof onChange === "function") {
        onChange(files, setFiles);
      }
    },
    [onChange, files]
  );

  const validator = useCallback(
    (file) => {
      if (files.length >= maxFiles) {
        return {
          code: "too-many-files",
          message: "Too many files"
        };
      }

      if (files.find((f) => f.size === file.size && f.name === file.name)) {
        return {
          code: "file-already-selected",
          message: "The file is already selected"
        };
      }

      if (customValidator && typeof customValidator === "function") {
        return customValidator(file);
      }

      return null;
    },
    [files, maxFiles, customValidator]
  );

  const handleDeleteItem = (file) => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
    onUpload(newFiles);
    if(newFiles.length === 0) {
      setIsLoaded(false);
    }

    if (onChange && typeof onChange === "function") {
      onChange(newFiles, setFiles);
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections
  } = useDropzone({
    onDrop,
    accept: allowedExtensions,
    maxFiles: maxFiles,
    validator
  });

  return (
    <Box sx={{ width: "100%" }}>
    <S.Container {...getRootProps({ sx: containerSx })}>
      <input
        {...getInputProps({
          multiple: multiFile
        })}
      />
      {content && typeof content === "function" ? (
        content({ isDragActive, multiFile, maxFiles, files })
      ) : (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100px" }}
        >
          <CloudUploadIcon
            className="cloud-upload-icon"
            sx={{
              fontSize: isDragActive ? "54px" : "50px",
              color: isDragActive ? "primary.main" : "primary.light",
              transition: "font-size 0.25s ease, color 0.25s ease"
            }}
          />
          {isDragActive ? (
            <Typography element="p">Drop the files here</Typography>
          ) : (
            <>
              <Typography element="p">
                {`Drag & drop or browse to choose file${
                  multiFile ? "s" : ""
                }`}
              </Typography>
              <Typography variant="caption">
                {maxFiles - files.length} files remaining
              </Typography>
              {allowedExtensions && (
                <Typography variant="caption">
                  Extensions accepted :{" "}
                  {Object.values(allowedExtensions)
                    .flat()
                    .reduce((acc, curr) => [acc, ", ", curr])}
                </Typography>
              )}
            </>
          )}
          <Typography variant="caption">
            {`Maximum size: ${maxFiles} file${
              maxFiles > 1 ? "s" : ""
            } per upload`}
          </Typography>
        </Stack>
      )}
      {/* {Boolean(files.length) && (
        <Box sx={{ mt: 2, width: "100%" }}>
          <AcceptedFilesItems
            acceptedFiles={files}
            onDelete={handleDeleteItem}
          />
        </Box>
      )}
      {Boolean(fileRejections.length) && (
        <Box sx={{ mt: 2, width: "100%" }}>
          <FileRejectionItems fileRejections={fileRejections} />
        </Box>
      )}
      </Box> */}
    </S.Container>
    {isloaded && (
      <Box sx={{ mt: 2, 
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 1
         
      }}>
        <Button variant="contained" color="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Box>
      )}
    </Box>
  );
};

FileUploader.propTypes = {
  multiFile: PropTypes.bool,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  containerSx: PropTypes.shape(),
  allowedExtensions: PropTypes.shape(),
  maxFiles: PropTypes.number,
  customValidator: PropTypes.func
};

FileUploader.defaultProps = {
  multiFile: false,
  content: null,
  containerSx: {},
  allowedExtensions: undefined,
  maxFiles: undefined,
  customValidator: null
};

export default FileUploader;
