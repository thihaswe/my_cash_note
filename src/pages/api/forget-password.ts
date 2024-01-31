// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import user from "@/store/slices/user";
import { ForgetPassword } from "@/types/forgetPassword";
import { prisma } from "@/utils/db";
import { EightK } from "@mui/icons-material";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { username, gender, dateOfBirth } = req.body as ForgetPassword;

    const required =
      (gender === "" || gender === undefined) &&
      (dateOfBirth === "" || dateOfBirth === undefined);

    if (required)
      return res.status(400).json("Bad Request Missing Required Fields");

    const exist = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!exist) return res.status(404).json("Not Found");

    const correct =
      exist.dateOfBirth === dateOfBirth && exist.gender === gender;

    if (correct) return res.status(200).json(exist);

    res.status(200).json(null);
  }

  res.status(405).json("Method Not Allowed");
}
