import {
  CreateNoteOptions,
  NoteInitialState,
  RemoveNoteOptions,
} from "@/types/note";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: NoteInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const addNoteThunk = createAsyncThunk(
  "note/addNoteThunk",
  async (options: CreateNoteOptions, thunkApi) => {
    const { onSuccess, onError, ...newNote } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/note`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newNote),
      });
      const data = await response.json();

      if (data === "Not Found") {
        return;
      }
      if (data === "Bad Request") {
        return;
      } else {
        thunkApi.dispatch(addNote(data));
        onSuccess && onSuccess();
      }
    } catch (error) {
      onError && onError();
    }
  }
);

export const removeNoteThunk = createAsyncThunk(
  "note/removeNoteThunk",
  async (options: RemoveNoteOptions, thunkApi) => {
    const { onSuccess, onError, id } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/note?itemId=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError(onError && onError());
    }
  }
);

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNote: (state, action) => {
      state.items = action.payload;
    },
    addNote: (state, action) => {
      state.items.push(action.payload);
    },
    removeNote: (state, action) => {
      state.items = state.items.filter((note) => note.id !== action.payload.id);
    },
  },
});

export const { setNote, addNote, removeNote } = noteSlice.actions;
export default noteSlice.reducer;
