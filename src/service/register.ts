import { LOGIN_REQUIRED, NOT_OWNER } from "./../constants/error";
import { IRegisterForm } from "../type/register";
import { FAIL } from "../constants/error";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { TYPE_ALL } from "../constants/error";
import RegisterRepository from "../repository/register";
import UserRepository from "../repository/user";

export const getAllRegisterService = async (_: Request, res: Response) => {
  const registerRepository = getCustomRepository(RegisterRepository);
  let registers = await registerRepository.getAllRegister();
  for (let register of registers) {
    if (register.user?.hashedPassword) register.user.hashedPassword = "";
  }
  res.status(200).json(registers);
};

export const getRegisterService = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { user } = req.body;
  if (user.id !== parseInt(userId)) throw new Error(NOT_OWNER);
  const registerRepository = getCustomRepository(RegisterRepository);
  let register = await registerRepository.getRegister(user.id);
  if (register?.user?.hashedPassword) register.user.hashedPassword = "";
  res.status(200).json(register);
};

export const updateRegisterService = async (req: Request, res: Response) => {
  const registerForm: IRegisterForm = req.body;
  const { birth, country, phone, memberId, course }: IRegisterForm =
    registerForm;
  if (!birth || !country || !phone || !memberId || !course)
    throw new Error(TYPE_ALL);
  const { userId } = req.params;
  const userRepository = getCustomRepository(UserRepository);
  const registerRepository = getCustomRepository(RegisterRepository);
  const user = await userRepository.getUser(parseInt(userId));
  if (!user) throw new Error(FAIL);
  await registerRepository.updateRegister(user.id, registerForm);

  let userAndRegister = await userRepository.getUserJoined(parseInt(userId));
  userAndRegister[0].hashedPassword = "";
  res.status(200).json(userAndRegister[0]);
};

export const confirmRegisterService = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userRepository = getCustomRepository(UserRepository);
  const registerRepository = getCustomRepository(RegisterRepository);
  await registerRepository.confirmRegister(parseInt(userId));

  let userAndRegister = await userRepository.getUserJoined(parseInt(userId));
  userAndRegister[0].hashedPassword = "";
  res.status(200).json(userAndRegister[0]);
};

export const payRegisterService = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userRepository = getCustomRepository(UserRepository);
  const registerRepository = getCustomRepository(RegisterRepository);
  await registerRepository.payRegister(parseInt(userId));

  let userAndRegister = await userRepository.getUserJoined(parseInt(userId));
  userAndRegister[0].hashedPassword = "";
  res.status(200).json(userAndRegister[0]);
};
