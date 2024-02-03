import LogIn from "@/components/LogIn";
import { Box, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";

const Home = () => {
  //

  const router = useRouter();
  return (
    <Box sx={{}}>
      <Box
        sx={{ display: " flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box
          sx={{
            height: 200,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">My Cash Note</Typography>
        </Box>
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            borderRadius: 3,
            border: "1px solid red",
            p: 3,
            color: "red",
          }}
        >
          you can use but don't waste
        </Typography>
        <Box sx={{ width: 300, height: 200 }}>
          <LogIn />
          <button
            className="button"
            style={{ marginTop: "15px" }}
            onClick={() => {
              router.push("/sign-up");
            }}
          >
            sign up
          </button>
        </Box>

        <Box sx={{ width: 300, height: 200 }}></Box>
      </Box>
    </Box>
  );
};

export default Home;
