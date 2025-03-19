import prisma from "../config/database";

export const createOrder = async (userId: string, items: { productId: string; quantity: number }[]) => {
  const totalPrice = items.reduce((sum, item) => sum + item.quantity, 0);

  const order = await prisma.order.create({
    data: {
      userId,
      totalPrice,
      status: "Pending",
      orderItems: { create: items.map((item) => ({ productId: item.productId, quantity: item.quantity, price: 0 })) },
    },
  });

  return order;
};

export const getUserOrders = async (userId: string) => {
  return await prisma.order.findMany({ where: { userId }, include: { orderItems: { include: { product: true } } } });
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  return await prisma.order.update({ where: { id: orderId }, data: { status } });
};
