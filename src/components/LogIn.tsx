import { useAppDispatch, useAppSelector } from "@/store/hook";
import { appSliceThunk } from "@/store/slices/app";
import { AppOptions } from "@/types/app";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

const defaultValue = {
  username: "",
  password: "",
};

const LogIn = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const usernameFalse = useAppSelector((store) => store.app.usernameFalse);
  const passwordFalse = useAppSelector((store) => store.app.passwordFalse);

  const [data, setData] = useState<AppOptions>(defaultValue);
  const [visible, setVisible] = useState<boolean>(false);
  const handleOnChange = () => {
    dispatch(
      appSliceThunk({
        ...data,
        onSuccess: () => {
          router.push("/note");
        },
      })
    );
  };
  return (
    <Box>
      <label htmlFor="username">UserName</label>
      {usernameFalse && (
        <span style={{ marginLeft: "15px", color: "red" }}>
          username is incorrect
        </span>
      )}
      <br />
      <input
        maxLength={15}
        id="username"
        type="text"
        defaultValue={data.username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setData({ ...data, username: e.target.value });
        }}
      ></input>
      <br />
      <label htmlFor="password">Password</label>
      {passwordFalse && (
        <span style={{ marginLeft: "15px", color: "red" }}>
          password is incorrect
        </span>
      )}
      <br />
      <div style={{ display: "flex", alignItems: "center", marginTop: "-5px" }}>
        <input
          id="password"
          defaultValue={data.password}
          type={visible ? "text" : "passwordj"}
          maxLength={15}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setData({ ...data, password: e.target.value });
          }}
        />
        <IconButton
          sx={{ textDecoration: "none" }}
          onClick={() => {
            setVisible(visible ? false : true);
          }}
        >
          <VisibilityIcon />
        </IconButton>
        <br />
      </div>
      <button
        className="button"
        onClick={handleOnChange}
        disabled={!(data.username.length > 0 && data.password.length > 0)}
      >
        <span> LogIn</span>
      </button>
      <button
        style={{ marginLeft: "15px" }}
        onClick={() => {
          router.push("/forget-password");
        }}
      >
        <span style={{ cursor: "pointer" }}>forgot pasword?</span>
      </button>
    </Box>
  );
};

export default LogIn;
