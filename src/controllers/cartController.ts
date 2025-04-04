import { Request, Response } from "express";
import prisma from "../config/database";

export const getCart = async (req: Request, res: Response) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: (req as any).user.id },
      include: { cartItems: true },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await prisma.cart.findUnique({
      where: { userId: (req as any).user.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: (req as any).user.id },
      });
    }

    const cartItem = await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      update: { quantity: { increment: quantity } },
      create: { cartId: cart.id, productId, quantity },
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    await prisma.cartItem.deleteMany({
      where: {
        cart: { userId: (req as any).user.id },
        productId: Number(productId),
      },
    });

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    await prisma.cart.deleteMany({ where: { userId: (req as any).user.id } });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
