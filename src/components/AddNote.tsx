import { Box, Button, Slide, TextField, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import { CreateNoteOptions } from "@/types/note";
import { useEffect, useState } from "react";
import { CategoryIcons } from "./Icon";
import { addNote, addNoteThunk } from "@/store/slices/note";
interface Prop {
  open: boolean;
  setOpen: (para?: any) => void;
}

const defaultValue: CreateNoteOptions = {
  iconId: 0,
  amount: 0,
  userId: 0,
  date: "",
};

const AddNote = ({ open, setOpen }: Prop) => {
  const icons = CategoryIcons;
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.item);
  const tdyDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return year + "-" + ("0" + month).slice(-2) + "-" + ("0" + day).slice(-2);
  };

  const [data, setData] = useState<CreateNoteOptions>(defaultValue);

  const [detail, setDetail] = useState(false);

  const IconToDisplay = icons.find((icon) => icon.id === data.iconId);
  useEffect(() => {
    if (user) {
      setData({ ...data, userId: user.id, date: tdyDate() });
    }
  }, [user, open]);

  useEffect(() => {
    return () => {
      setDetail(false);
      setData(defaultValue);
    };
  }, []);
  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit timeout={1000}>
      <Box
        sx={{
          opacity: 0.8,
          backgroundColor: "whitesmoke",
          position: "fixed",
          bottom: 0,
          left: 0,
          height: "80vh",
          width: "100%",
        }}
      >
        <Box>
          <Button
            onClick={() => {
              setOpen(false);
              setData(defaultValue);
              setDetail(false);
            }}
          >
            cancel
          </Button>
          <Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", overflow: "scroll" }}>
              {icons.map((item) => {
                return (
                  <Button
                    key={item.id}
                    sx={{ m: 1 }}
                    variant={item.id === data.iconId ? "contained" : "outlined"}
                    onClick={() => {
                      setData({ ...data, iconId: item.id });
                      setDetail(true);
                    }}
                  >
                    <Box sx={{ width: 35, height: 35 }}>{item.iconFile}</Box>
                  </Button>
                );
              })}
            </Box>
          </Box>
        </Box>
        <Slide
          direction="up"
          in={detail && data.iconId !== 0}
          mountOnEnter
          unmountOnExit
          timeout={500}
        >
          <Box
            sx={{
              backgroundColor: "grey",
              position: "fixed",
              bottom: 0,

              height: "40vh",
              right: 0,
              left: 0,
            }}
          >
            <Box sx={{}}>
              <Box sx={{ m: "0 auto" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  <Typography sx={{ fontSize: 15 }}>
                    {IconToDisplay?.name}
                  </Typography>
                  <TextField
                    placeholder="enter amount"
                    id="my-input"
                    onChange={(e) => {
                      setData({ ...data, amount: Number(e.target.value) });
                    }}
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    }}
                  ></TextField>
                  <Button
                    variant="contained"
                    onClick={() => {
                      dispatch(
                        addNoteThunk({
                          ...data,
                          onSuccess: () => {
                            setOpen(false);
                            setData(defaultValue);
                            setDetail(false);
                          },
                        })
                      );
                    }}
                  >
                    ok
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Slide>
      </Box>
    </Slide>
  );
};

export default AddNote;
