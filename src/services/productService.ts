import prisma from "../config/database";

export const createProduct = async (name: string, description: string, price: number, stock: number) => {
  return await prisma.product.create({ data: { name, description, price, stock } });
};

export const getAllProducts = async () => {
  return await prisma.product.findMany();
};

export const getProductById = async (id: string) => {
  return await prisma.product.findUnique({ where: { id } });
};

export const updateProduct = async (id: string, data: any) => {
  return await prisma.product.update({ where: { id }, data });
};

export const deleteProduct = async (id: string) => {
  return await prisma.product.delete({ where: { id } });
};
