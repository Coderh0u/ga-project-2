import React from "react";
import {
  Box,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";

const Filter = (props) => {
  return (
    <Box>
      <FormControl>
        <FormGroup>
          <FormControlLabel
            label="No Auth"
            control={
              <Checkbox
                checked={props.auth}
                onChange={() => {
                  props.setAuth(!props.auth);
                }}
                style={{ color: props.auth ? "#ce93d8" : "#00000099" }}
              />
            }
          />
          {/* test */}
          <button
            onClick={() => {
              console.log("filteredData", props.filteredData);
              console.log(
                "auth " +
                  props.auth +
                  " https " +
                  props.https +
                  " cors " +
                  props.cors
              );
              console.log("interArr", props.interArr);
            }}
          >
            Test
          </button>
          {/* test */}
          <FormControlLabel
            label="HTTPS only"
            control={
              <Checkbox
                checked={props.https}
                onChange={() => {
                  props.setHttps(!props.https);
                }}
                style={{ color: props.https ? "#ce93d8" : "#00000099" }}
              />
            }
          />
          <FormControlLabel
            label="No Cors"
            control={
              <Checkbox
                checked={props.cors}
                onChange={() => {
                  props.setCors(!props.cors);
                }}
                style={{ color: props.cors ? "#ce93d8" : "#00000099" }}
              />
            }
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default Filter;
