import { Response, Request } from "express";

import * as authService from "../services/authService.js";
import { UserData } from "./../repositories/authRepository.js";

export async function signUp(req: Request, res: Response) {
  const body: UserData = req.body;
  await authService.signUp(body);
  return res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const body: UserData = req.body;
  const token = await authService.signIn(body);
  return res.status(200).send({ token });
}
