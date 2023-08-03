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
    modal: {
      overflow: "scroll",
    },
    button: {
      border: "2px solid #00000099",

      height: "75px",
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

  const searchApi = (data) => {
    if (searchRef.current) {
      return data.filter((obj) => {
        return Object.values(obj).some((str) => {
          return String(str).includes(searchRef.current.toLowerCase());
        });
      });
    }
  };

  useEffect(() => {
    if (props.filteredData) {
      searchApi(props.filteredData);
    } else if (props.allData) {
      searchApi(props.allData);
    }
  }, [props.allData, props.filteredData]);

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
        <Modal
          sx={style.modal}
          open={searchModal}
          onClose={() => setSearchModal(false)}
        >
          <Box sx={style.box}>
            {foundData.current.map((item) => {
              return (
                // OnClick do something here
                <Button
                  sx={style.button}
                  style={{
                    width: "90%",
                    height: "75",
                    align: "center",
                    padding: 40,
                  }}
                  variant="outlined"
                >
                  <Typography align={"center"}>
                    <strong>API: </strong>
                    {item.API}
                    <br />
                    <strong>Description: </strong>
                    {item.Description}
                  </Typography>

                  {/* <Typography align={"right"}></Typography> */}
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
