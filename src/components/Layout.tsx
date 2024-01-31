import { useAppDispatch, useAppSelector } from "@/store/hook";
import { appSliceThunk } from "@/store/slices/app";
import { logout } from "@/store/slices/auth";
import { getCookieValue } from "@/utils/general";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import ConfirmationBox from "./ConfirmationBox";

interface Prop {
  children: ReactNode;
}

const Layout = ({ children }: Prop) => {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const dispatch = useAppDispatch();
  const logInOrNot = useAppSelector((store) => store.auth.isAuthenticated);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (logInOrNot) {
      const accessToken = getCookieValue("token");

      accessToken && dispatch(appSliceThunk({ accessToken }));
    } else {
      router.push("/");
    }
  }, [logInOrNot]);

  if (isHome) return <Box>{children}</Box>;
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          height: 50,
          backgroundImage: "linear-gradient(to right, #ff8c00, #ffc0cb)",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          logout
        </Button>
      </Box>
      <Box sx={{ padding: 3 }}>{children}</Box>

      <ConfirmationBox
        isLayout={true}
        open={open}
        setOpen={setOpen}
        myFunc={() => {
          dispatch(logout());
          setOpen(false);
        }}
      ></ConfirmationBox>
    </Box>
  );
};
export default Layout;
