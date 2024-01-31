import FastfoodIcon from "@mui/icons-material/Fastfood";
import SavingsIcon from "@mui/icons-material/Savings";
import PaidIcon from "@mui/icons-material/Paid";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { ReactNode } from "react";
import { CategoryIcon } from "@/types/note";

export const CategoryIcons: CategoryIcon[] = [
  { id: 1, iconFile: <PaidIcon />, name: "debt" },
  { id: 2, iconFile: <ShoppingBagIcon />, name: "shopping" },
  { id: 3, iconFile: <SavingsIcon />, name: "saving" },
  { id: 4, iconFile: <FastfoodIcon />, name: "food" },
];
