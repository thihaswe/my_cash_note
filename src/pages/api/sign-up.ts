// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === "POST") {
    const { username, password, dateOfBirth, gender } = req.body;

    const exist = await prisma.user.findUnique({ where: { username } });
    if (exist) return res.status(400).json("Bad Request");
    const user = await prisma.user.create({
      data: {
        username,
        password,
        dateOfBirth,
        gender,
      },
    });
    return res.status(200).json(user);
  }
  res.status(200).json({ name: "John Doe" });
}
