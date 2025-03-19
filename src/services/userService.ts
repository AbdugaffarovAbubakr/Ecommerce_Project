import prisma from "../config/database";
import { hashPassword, comparePassword } from "../utils/hashPassword";
import generateToken from "../utils/generateToken";

export const registerUser = async (name: string, email: string, password: string) => {
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) throw new Error("User already exists");

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return { id: user.id, name: user.name, email: user.email, token: generateToken(user.id) };
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await comparePassword(password, user.password))) {
    throw new Error("Invalid email or password");
  }

  return { id: user.id, name: user.name, email: user.email, token: generateToken(user.id) };
};

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } });
};
