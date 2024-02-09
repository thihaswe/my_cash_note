import { useAppDispatch, useAppSelector } from "@/store/hook";
import { appSliceThunk } from "@/store/slices/app";
import { logout } from "@/store/slices/auth";
import { getCookieValue } from "@/utils/general";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import ConfirmationBox from "./ConfirmationBox";

interface Prop {
  children: ReactNode;
}

const Layout = ({ children }: Prop) => {
  const router = useRouter();
  const isHome = router.pathname === "/" || router.pathname === "/sign-up";
  const dispatch = useAppDispatch();
  const logInOrNot = useAppSelector((store) => store.auth.isAuthenticated);
  const [open, setOpen] = useState(false);

  console.log("log in or not ", logInOrNot);
  useEffect(() => {
    if (logInOrNot) {
      const accessToken = getCookieValue("token");

      accessToken && dispatch(appSliceThunk({ accessToken }));
    } else {
      router.push("/");
    }
  }, [logInOrNot]);

  if (isHome) {
    return (
      <div
        style={{
          backgroundImage: `url(/coins.jpg)`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>{children}</Box>
      </div>
    );
  } else {
    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            height: 50,
            backgroundImage: "linear-gradient(to right, #ff8c00, #ffc0cb)",
            justifyContent: "space-around",
            width: "100vw",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "red",
            }}
          >
            {`you can use but don't waste`}
          </Typography>
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            logout
          </Button>
        </Box>
        <Box
          sx={{
            padding: 3,
            background: "linear-gradient(45deg,yellow,gold )",
            minHeight: "100vh",
          }}
        >
          {children}
        </Box>

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
  }
};
export default Layout;
