import React, { useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Search = () => {
  const searchRef = useRef();

  return (
    <>
      
      <Stack direction="row" spacing={2}>
      <TextField
        id="outlined-search"
        label="Search APIs"
        type="search"
        ref={searchRef}
      />
      <Button>Search</Button>
      </Stack>
    </>
  );
};

export default Search;
