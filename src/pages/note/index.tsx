import AddNote from "@/components/AddNote";
import ConfirmationBox from "@/components/ConfirmationBox";
import { CategoryIcons } from "@/components/Icon";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { removeNote, removeNoteThunk } from "@/store/slices/note";
import { CategoryIcon, GroupNote } from "@/types/note";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Divider,
  Input,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Note } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const defaultValue: Note = {
  id: 0,
  amount: 0,
  iconId: 0,
  userId: 0,
  date: "",
};
const NotePage = () => {
  const isTablet = useMediaQuery("(min-width:800px)");
  const { isReady, ...router } = useRouter();
  const notes = useAppSelector((store) => store.note.items);

  const icons = CategoryIcons;
  const dispatch = useAppDispatch();
  // const logInOrNot = useAppSelector((store) => store.auth.isAuthenticated);
  // useEffect(() => {
  //   if (logInOrNot) {
  //     const accessToken = getCookieValue("token");
  //   }
  // }, [logInOrNot]);

  const [item, setItem] = useState(defaultValue);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [open, setOpen] = useState(false);

  const currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1; // Note: Month is zero-based, so we add 1
  var year = currentDate.getFullYear();
  const formatMonth = (month: number | string, year: number | string) => {
    return year + "-" + ("0" + month).slice(-2);
  };
  const formattedDate = formatMonth(month, year);

  const notesFiltered = notes.filter((item) => item.date >= date);

  const sortedNotes = [...notesFiltered].sort((a, b) =>
    b.date.localeCompare(a.date)
  );
  const totalAmount = sortedNotes.reduce((curr, acc) => {
    return (curr += acc.amount);
  }, 0);
  let groupNotes: GroupNote[] = [];

  sortedNotes.map((note: Note) => {
    const { date } = note;

    const existing = groupNotes.find((gn) => date === gn.date);

    if (existing) {
      existing.noteObj.push(note);
    } else {
      groupNotes.push({ date: date, noteObj: [note] });
    }
  });

  useEffect(() => {
    setDate(formattedDate);
  }, [formattedDate]);

  const handleRemove = (a: Note) => {
    dispatch(
      removeNoteThunk({
        id: a.id,
        onSuccess: () => {
          dispatch(removeNote(a));
          setConfirm(false);
          setItem(defaultValue);
        },
      })
    );
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          height: 50,
        }}
      >
        <Box>
          <Input
            type="month"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          ></Input>
          <Button
            onClick={() => {
              setDate("");
            }}
          >
            ALL TIME
          </Button>
        </Box>

        <AddNote open={open} setOpen={setOpen}></AddNote>
        {!open && (
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            Add New
            <AddCircleOutlineIcon sx={{ fontSize: 35, color: "black" }} />
          </Button>
        )}
      </Box>
      <Box>
        <Box sx={{ margin: "0 auto", maxWidth: 800, mb: 5 }}>
          {groupNotes.map((item) => {
            return (
              <Box key={item.date} sx={{ mb: 5 }}>
                <Typography>{item.date}</Typography>
                {item.noteObj
                  .sort((a, b) => b.id - a.id)
                  .map((objItem: Note) => {
                    const iconToShow = icons.find(
                      (icon) => objItem.iconId === icon.id
                    ) as CategoryIcon;
                    return (
                      <Box
                        key={objItem.id}
                        sx={{
                          display: "flex",
                          maxWidth: 700,
                          justifyContent: "space-between",
                          marginTop: 1,
                        }}
                      >
                        <Box>
                          <Box
                            sx={{
                              width: { xs: 250, sm: 500 },
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box sx={{ display: "block" }}>
                              {iconToShow.iconFile}
                            </Box>
                            <Box>{iconToShow.name}</Box>
                            <Box>{objItem.amount}</Box>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            maxWidth: 150,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <button
                            onClick={() => {
                              // handleRemove(objItem);
                              setItem(objItem);
                              setConfirm(true);
                            }}
                          >
                            <DeleteIcon></DeleteIcon>
                          </button>
                        </Box>
                      </Box>
                    );
                  })}
              </Box>
            );
          })}
          <Box>
            <Divider sx={{ mt: 5 }}></Divider>
            {groupNotes.length !== 0 && (
              <>
                <Typography sx={{ mt: 3, display: "inline-block", mr: 15 }}>
                  TOTAL AMOUNT
                </Typography>
                {totalAmount}
              </>
            )}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          mt: 5,
          height: 30,
          maxWidth: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
      ></Box>
      <ConfirmationBox
        isLayout={false}
        open={confirm}
        setOpen={setConfirm}
        myFunc={() => {
          handleRemove(item);
        }}
      ></ConfirmationBox>
    </Box>
  );
};

export default NotePage;
