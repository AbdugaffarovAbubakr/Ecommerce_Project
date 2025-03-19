import prisma from "../config/database";

export const getCartByUserId = async (userId: string) => {
  return await prisma.cart.findUnique({ where: { userId }, include: { cartItems: { include: { product: true } } } });
};

export const addToCart = async (userId: string, productId: string, quantity: number) => {
  let cart = await prisma.cart.findUnique({ where: { userId } });

  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } });
  }

  const cartItem = await prisma.cartItem.create({
    data: { cartId: cart.id, productId, quantity },
  });

  return cartItem;
};

export const removeFromCart = async (cartItemId: string) => {
  return await prisma.cartItem.delete({ where: { id: cartItemId } });
};

export const clearCart = async (userId: string) => {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) throw new Error("Cart not found");

  return await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
};
