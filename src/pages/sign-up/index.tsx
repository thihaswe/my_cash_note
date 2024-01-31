import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setInfo } from "@/store/slices/forgetPassword";
import { singUpThunk } from "@/store/slices/user";
import { SignUp } from "@/types/signUp";
import { FlagRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Gender } from "@prisma/client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const defaultValue: SignUp = {
  username: "",
  password: "",
  gender: "" as Gender,
  dateOfBirth: "",
};
const SignUP = () => {
  const dispatch = useAppDispatch();

  const information = useAppSelector((store) => store.forgetPassword.wrongInfo);
  const router = useRouter();

  const [data, setData] = useState<SignUp>(defaultValue);
  useEffect(() => {
    return () => {
      dispatch(setInfo(false));
    };
  }, []);
  const handleOnClick = () => {
    dispatch(
      singUpThunk({
        ...data,
        onSuccess: () => {
          router.push("/note");
          setData(defaultValue);
        },
      })
    );
  };
  return (
    <Box>
      <Box sx={{ maxWidth: 500, margin: "0 auto" }}>
        <Box>
          <InputLabel>Username</InputLabel>
          <TextField
            defaultValue={data.username}
            inputProps={{ maxLength: 15 }}
            onChange={(e) => {
              setData({ ...data, username: e.target.value });
            }}
          ></TextField>
          {information && <Typography>* username is already taken</Typography>}
          <InputLabel>Password</InputLabel>
          <TextField
            defaultValue={data.password}
            inputProps={{ maxLength: 15 }}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          ></TextField>
          <br />
          <FormControl sx={{ width: 150, mt: 3 }}>
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              onChange={(e: SelectChangeEvent<unknown>) => {
                setData({ ...data, gender: e.target.value as Gender });
              }}
            >
              <MenuItem value={"male"}>male</MenuItem>
              <MenuItem value={"female"}>female</MenuItem>
            </Select>
          </FormControl>
          <br />
          <Box sx={{ mt: 3 }}>
            <InputLabel>Date of birth</InputLabel>
            <Input
              type="date"
              onChange={(e) => {
                setData({ ...data, dateOfBirth: e.target.value });
              }}
            ></Input>
          </Box>
          <div style={{ marginTop: "25px" }}>
            <Button
              sx={{ mr: 3 }}
              onClick={() => {
                setData(defaultValue);
                router.push("/");
              }}
            >
              cancel
            </Button>
            <Button variant="contained" onClick={handleOnClick}>
              confirm
            </Button>
          </div>
        </Box>

        <Box></Box>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default SignUP;
