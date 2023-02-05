import { IRegisterForm } from "./../type/register";
import { FAIL, INVALID_PASSWORD, TYPE_ALL, USER } from "./../constants/error";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repository/user";
import bcrypt from "bcryptjs";
import { generateToken } from "../util/generateToken";
import { serialize } from "../util/serialize";
import RegisterRepository from "../repository/register";

export const signUpService = async (req: Request, res: Response) => {
  const { name, password, email } = req.body;
  if (!name || !password) throw new Error(TYPE_ALL);
  const userRepository = getCustomRepository(UserRepository);
  const registerRepository = getCustomRepository(RegisterRepository);
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = await userRepository.createUser(
    name,
    hashedPassword,
    email,
    4
  );
  if (!userId) throw new Error(FAIL);
  const registerForm: IRegisterForm = {
    birth: "",
    country: "",
    phone: "",
    memberId: "",
    course: "",
  };
  const user = await userRepository.getUser(parseInt(userId));
  if (!user) throw new Error(FAIL);
  const registerId = await registerRepository.createRegister(
    user,
    registerForm
  );
  if (!registerId) throw new Error(FAIL);
  const register = await registerRepository.getRegister(registerId);
  if (!register) throw new Error(FAIL);
  await userRepository.connectUserAndRegister(user.id, register);

  let userAndRegister = await userRepository.getUserJoined(user.id);
  userAndRegister[0].hashedPassword = "";
  res.status(200).json(userAndRegister[0]);
};

export const loginService = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  if (!name || !password) throw new Error(TYPE_ALL);
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.getUserByUsername(name);
  if (!user) throw new Error(USER);
  const vaild = await bcrypt.compare(password, user.hashedPassword);
  if (!vaild) throw new Error(INVALID_PASSWORD);

  res.set("token", generateToken(user));

  let userAndRegister = await userRepository.getUserJoined(user.id);
  userAndRegister[0].hashedPassword = "";
  res.status(200).json(userAndRegister[0]);
};

export const checkService = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.getUser(parseInt(userId));
  if (!user) throw new Error(USER);

  let userAndRegister = await userRepository.getUserJoined(parseInt(userId));
  userAndRegister[0].hashedPassword = "";
  res.status(200).json(userAndRegister[0]);
};
