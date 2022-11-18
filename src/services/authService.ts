import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authRepository, UserData } from "../repositories/authRepository.js";
import * as saltUtil from "../utils/saltUtil.js";
import * as err from "../utils/errorUtil.js";


async function usernameMustNotBeRegister(username: string) {
  const user = await authRepository.getByUsername(username);
  if (user) {
    throw err.conflictError("This username is already in use!");
  }
  return;
}

export function encryptPassword(password: string) {
  const encryptedPassword = bcrypt.hashSync(password, saltUtil.bcrypt);
  return encryptedPassword;
}

async function usernameMustBeRegister(username: string) {
  const user = await authRepository.getByUsername(username);
  if (!user) {
    throw err.unauthorizedError("Incorrect username or password!");
  }
  return user;
}

function passwordMustMatch(inputPassword: string, userPassword: string) {
  const correctPassword = bcrypt.compareSync(inputPassword, userPassword);
  if (!correctPassword) {
    throw err.unauthorizedError("Incorrect email or password!");
  }
  return;
}

function generateJwtToken(userId: number) {
  const data = { userId };
  const config = { expiresIn: saltUtil.timeToJwtExpires };
  const token = jwt.sign(data, saltUtil.jwt, config);
  return token;
}

export async function signUp(user: UserData) {
  await usernameMustNotBeRegister(user.username);
  const encryptedPassword = encryptPassword(user.password);
  await authRepository.insert({ ...user, password: encryptedPassword });
  return 0;
}

export async function signIn(userInput: UserData) {
  const user = await usernameMustBeRegister(userInput.password);
  passwordMustMatch(userInput.password, user.password);
  const token = generateJwtToken(user.id);
  return token;
}