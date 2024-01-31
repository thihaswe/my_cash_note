import { Box, Button, Dialog, Typography } from "@mui/material";
import { Note } from "@prisma/client";
import React from "react";

interface Prop {
  open: boolean;
  myFunc: (para?: any) => void;
  setOpen: (para?: any) => void;
  isLayout: boolean;
}
const ConfirmationBox = ({ open, setOpen, myFunc, isLayout }: Prop) => {
  return (
    <Dialog
      sx={
        isLayout
          ? {
              opacity: 1,
            }
          : { opacity: 0.8 }
      }
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Box
        sx={{
          width: 200,
          p: 3,
        }}
      >
        <Typography sx={{ mb: 1 }}>
          {isLayout ? `are you sure to log out?` : `are you sure to delete?`}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              myFunc();
            }}
          >
            confirm
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ConfirmationBox;
