import React, { useRef, useState, useEffect } from "react";
// importing from MUI
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  Modal,
} from "@mui/material";
import ClassNameGenerator from "@mui/utils/ClassNameGenerator/ClassNameGenerator";

const Search = (props) => {
  const searchRef = useRef(null);
  const [searchModal, setSearchModal] = useState(false);
  const foundData = useRef([]);

  // MUI styling
  const style = {
    button: {
      border: "2px solid #00000099",
    },
    box: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    },
  };

  const searchApi = (allData) => {
    if (searchRef.current) {
      return allData.filter((obj) => {
        return Object.values(obj).some((str) => {
          return String(str).includes(searchRef.current);
        });
      });
    }
  };

  useEffect(() => {
    if (props.allData) {
      searchApi(props.allData);
    }
  }, [props.allData]);

  return (
    <>
      <Stack direction="row" spacing={2}>
        <TextField
          id="outlined-search"
          label="Search APIs"
          type="search"
          onChange={(e) => (searchRef.current = e.target.value)}
        />
        <Button
          // variant="outlined"
          color="primary"
          onClick={() => {
            if (props.allData && searchRef.current) {
              foundData.current = searchApi(props.allData);
              setSearchModal(true);
              console.log(foundData.current);
            }
            console.log(searchRef.current);
            setSearchModal(true);
            searchRef.current = null;
            console.log(searchRef.current);
          }}
          style={{ color: "#00000099" }}
        >
          Search
        </Button>
        <Modal open={searchModal} onClose={() => setSearchModal(false)}>
          <Box sx={style.box}>
            {foundData.current.map((item) => {
              return (
                <Button variant="outlined">
                  <strong>API: </strong>
                  <Typography>{item.API}</Typography>
                  <br />
                  <strong>Description: </strong>
                  <Typography>{item.Description}</Typography>
                </Button>
              );
            })}
          </Box>
        </Modal>
      </Stack>
    </>
  );
};

export default Search;
