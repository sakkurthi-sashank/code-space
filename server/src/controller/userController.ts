import { Request, Response } from "express";
import { createUserService } from "../service/userService";

export const createUserController = async (req: Request, res: Response) => {
  const { firstName, lastName, email, admissionNumber } = req.body;

  try {
    const user = await createUserService({
      firstName,
      lastName,
      email,
      admissionNumber,
    });

    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
