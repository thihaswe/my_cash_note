import { isAuthenticated } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { Note } from "@prisma/client";
import { retry } from "@reduxjs/toolkit/query";
import type { NextApiRequest, NextApiResponse } from "next";
import { preloadStyle } from "next/dist/server/app-render/entry-base";
import { preconnect } from "react-dom";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = isAuthenticated(req);
  if (!user) return res.status(401).json("unauthorized");
  const method = req.method;

  if (method === "POST") {
    const newNote = req.body;
    const date = newNote.date;
    const iconId = Number(newNote.iconId);
    const amount = Number(newNote.amount);
    const userId = Number(newNote.userId);

    if (!(date && iconId && userId && amount > 0))
      return res.status(400).send("Bad Request");

    const exist = await prisma.user.findUnique({ where: { id: userId } });
    if (!exist) return res.status(404).json("Not Found");

    const note = await prisma.note.create({
      data: { userId, amount, date, iconId },
    });

    return res.status(200).json(note);
  } else if (method === "DELETE") {
    const itemId = Number(req.query.itemId);
    const exist = await prisma.note.findUnique({ where: { id: itemId } });
    if (!exist) return res.status(404).json("Not Found");
    await prisma.note.delete({ where: exist });
    return res.status(200).json("ok");
  }

  res.status(405).json("Method Not Allowed");
}
