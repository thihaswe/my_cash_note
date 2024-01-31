// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "@/utils/db";
import { generateToken, verifyToken } from "@/utils/general";
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { username, password, accessToken } = req.body;
    if (accessToken) {
      // Assuming verifyToken returns a User synchronously
      const user = verifyToken(accessToken);

      if (!user) return res.status(401).json("Unauthorized");

      const notes = await prisma.note.findMany({
        where: { userId: user.id },
      });
      return res.status(200).json({ user, notes, token: accessToken });
    } else if (username && password) {
      const usernameExist = await prisma.user.findFirst({
        where: { username },
      });
      if (!usernameExist) return res.status(400).json("Bad Request1");
      const passwordExist = await prisma.user.findFirst({
        where: { password },
      });
      if (!passwordExist) return res.status(400).json("Bad Request2");
      const user = passwordExist;
      const token = generateToken(user);
      const notes = await prisma.note.findMany({ where: { userId: user.id } });

      return res.status(200).json({ user, notes, token });
    }
  }

  res.status(405).json("Method Not Allowed");
}
