/* eslint-disable no-useless-escape */
import joi from "joi";
import { UserDataInput } from "../repositories/authRepository";

const atLeast_1Lower_1Upper_1Number_Min8Digits = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

export const signUpSchema = joi.object<UserDataInput>({
  username: joi.string().trim().min(3).required(),
  password: joi.string().pattern(new RegExp(atLeast_1Lower_1Upper_1Number_Min8Digits)).required(),
});

export const signInSchema = joi.object<UserDataInput>({
  username: joi.string().trim().required(),
  password: joi.string().trim().required()
});
