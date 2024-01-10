// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { username, password } = req.body;

    const usernameExist = await prisma.user.findFirst({ where: { username } });
    if (!usernameExist) return res.status(400).json("Bad Request1");
    const passwordExist = await prisma.user.findFirst({ where: { password } });
    if (!passwordExist) return res.status(400).json("Bad Request2");
    const user = passwordExist;

    return res.status(200).json("ok");
  }

  res.status(405).json("Method Not Allowed");
}
