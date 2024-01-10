import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setUsername } from "@/store/slices/app";
import { setInfo } from "@/store/slices/forgetPassword";
import { setUser } from "@/store/slices/user";
import { ForgetPassword } from "@/types/forgetPassword";
import { config } from "@/utils/config";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  Box,
  Button,
  IconButton,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { SourceTextModule } from "vm";

const ForgetPassword = () => {
  const user = useAppSelector((store) => store.user.item);
  const wrongInfo = useAppSelector((store) => store.forgetPassword.wrongInfo);
  const usernameFalse = useAppSelector((store) => store.app.usernameFalse);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<ForgetPassword>({
    username: "",
    gender: "",
    dateOfBirth: "",
  });

  const handleForget = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/forget-password`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseUser = await response.json();
      console.log(responseUser);
      if (responseUser === "Not Found") {
        dispatch(setInfo(false));
        dispatch(setUser({}));
        dispatch(setUsername(true));
      } else if (responseUser === null) {
        dispatch(setUsername(false));

        dispatch(setUser({}));
        dispatch(setInfo(true));
      } else {
        dispatch(setUsername(false));
        dispatch(setInfo(false));
        dispatch(setUser(responseUser));
      }
    } catch (error) {}
  };
  return (
    <Box>
      <Box>
        <IconButton
          onClick={() => {
            dispatch(setUser({}));
            router.push("/");
          }}
        >
          <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
        </IconButton>
      </Box>
      <Box display={"flex"} justifyContent={"center"}>
        <Box width={500}>
          <InputLabel>UerName</InputLabel>
          <TextField
            autoFocus
            type="text"
            onChange={(e) => {
              setData({ ...data, username: e.target.value });
            }}
          />
          {usernameFalse ? <span>your user name is incorrect</span> : <></>}
          <br />
          <div style={{ marginTop: "15px" }}>
            <InputLabel>Gender</InputLabel>
            <select
              value={data.gender}
              onChange={(e) => {
                setData({ ...data, gender: e.target.value });
              }}
            >
              <option value="" disabled hidden>
                Select Gender
              </option>
              <option value={"male"}>male</option>
              <option value={"female"}>female</option>
            </select>
          </div>
          <br />
          <InputLabel>Date of birth</InputLabel>
          <Input
            type="date"
            onChange={(e) => {
              setData({ ...data, dateOfBirth: e.target.value });
            }}
          ></Input>
          <Box sx={{ mt: 5 }}>
            <Button
              onClick={() => {
                router.push("/");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleForget();
              }}
              variant="contained"
            >
              confirm
            </Button>
          </Box>
          <Box>
            {user.password ? (
              <Typography sx={{ mt: 15 }}>
                Your Password is {user.password}
              </Typography>
            ) : (
              <>
                {wrongInfo ? (
                  <Typography sx={{ mt: 15 }}>
                    your information is wrong
                  </Typography>
                ) : (
                  <></>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgetPassword;
