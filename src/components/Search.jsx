import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Search = (props) => {
  const searchRef = useRef(null);
  // const [filteredData, setFilteredData] = useState([]);

  const searchApi = (allData) => {
    return allData.filter((obj) => {
      return Object.values(obj).some((str) => {
        return String(str).includes(searchRef.current);
      });
    });
  };

  useEffect(() => {
    if (props.allData) {
      const filteredData = searchApi(props.allData);
      // setFilteredData(filteredData);
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
          variant="outlined"
          color="primary"
          onClick={() => {
            if (props.allData) {
              const filteredData = searchApi(props.allData);
              // setFilteredData(filteredData);
              console.log(filteredData);
            }
          }}
          style={{ color: "black" }}
        >
          Search
        </Button>
      </Stack>
    </>
  );
};

export default Search;
