import React, { useRef, useState, useEffect } from "react";
import APICard from "./APICard";
// importing from MUI
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  Modal,
} from "@mui/material";

const Search = (props) => {
  const searchRef = useRef(null);
  const [searchModal, setSearchModal] = useState(false);
  const foundData = useRef([]);
  const [foundIdx, setFoundIdx] = useState();

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
          variant="outlined"
          onClick={() => {
            if (props.filteredData && searchRef.current) {
              foundData.current = searchApi(props.filteredData);
              setSearchModal(true);
              console.log(foundData.current);
            } else if (props.allData && searchRef.current) {
              foundData.current = searchApi(props.allData);
              setSearchModal(true);
              console.log(foundData.current);
            }
            console.log(searchRef.current);
            setSearchModal(true);
            searchRef.current = null;
            console.log(searchRef.current);
          }}
          style={{
            marginTop: "5px",
            marginRight: "20px",
            color: "white",
            border: "2px solid #00000099",
          }}
        >
          Search
        </Button>
        <Modal
          sx={style.modal}
          open={searchModal}
          onClose={() => setSearchModal(false)}
        >
          <Box sx={style.box}>
            {foundData.current.map((item, idx) => {
              return (
                <Button
                  onClick={() => {
                    setSearchModal(false);
                    setFoundIdx(idx);
                    props.setModal(true);
                    console.log("props.modal", props.modal);
                    console.log("foundIDx", foundIdx);
                  }}
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
                </Button>
              );
            })}
          </Box>
        </Modal>
        {props.modal && foundIdx && (
          <APICard
            api={foundData.current[foundIdx].API}
            desc={foundData.current[foundIdx].Description}
            auth={foundData.current[foundIdx].Auth}
            https={foundData.current[foundIdx].HTTPS}
            cors={foundData.current[foundIdx].Cors}
            link={foundData.current[foundIdx].Link}
            cat={foundData.current[foundIdx].Category}
            setModal={props.setModal}
            resetState={setFoundIdx}
          
          ></APICard>
        )}
      </Stack>
    </>
  );
};

export default Search;
