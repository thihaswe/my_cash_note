import { Note } from "@prisma/client";
import { ReactNode } from "react";
import { BaseOptions } from "./app";

export interface NoteInitialState {
  items: Note[];
  isLoading: boolean;
  error: Error | null;
}

export interface GroupNote {
  date: string;
  noteObj: Note[];
}
export interface CategoryIcon {
  id: number;
  iconFile: ReactNode;
  name: string;
}

export interface CreateNoteOptions extends BaseOptions {
  iconId: number;
  date: string;
  amount: number;
  userId: number;
}

export interface RemoveNoteOptions extends BaseOptions {
  id: number;
}
