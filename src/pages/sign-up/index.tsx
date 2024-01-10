import { Label } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { kMaxLength } from "buffer";
import React from "react";

const SignUP = () => (
  <Box>
    <Box sx={{ maxWidth: 500, margin: "0 auto" }}>
      <Box></Box>
      <InputLabel>Username</InputLabel>
      <TextField inputProps={{ maxlength: 15 }}></TextField>
      <InputLabel>Password</InputLabel>
      <TextField inputProps={{ maxlength: 15 }}></TextField>
      <br />
      <FormControl sx={{ width: 150, mt: 3 }}>
        <InputLabel>Gender</InputLabel>
        <Select
          label="Gender"
          onChange={(e: SelectChangeEvent<unknown>) => {
            console.log(e.target.value);
          }}
        >
          <MenuItem value={"male"}>male</MenuItem>
          <MenuItem value={"female"}>female</MenuItem>
        </Select>
      </FormControl>
      <Box></Box>
      <Box></Box>
    </Box>
  </Box>
);

export default SignUP;
