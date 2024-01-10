// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { username, gender, dateOfBirth } = req.body;

    const exist = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!exist) return res.status(404).json("Not Found");
    const user = await prisma.user.findFirst({
      where: { username, dateOfBirth, gender },
    });

    return res.status(200).json(user);
  }
  res.status(405).json("Method Not Allowed");
}
