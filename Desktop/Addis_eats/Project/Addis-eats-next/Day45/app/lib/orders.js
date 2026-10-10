import dishes from "../../public/menu-data.json";

const orders = new Map();

export function createOrder({ contact, items, user }) {
  const orderItems = [];

  for (const item of items) {
    const dish = dishes.find(
      (dish) => String(dish.id) === String(item.id)
    );

    if (!dish) {
      return null;
    }

    orderItems.push({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      quantity: item.quantity,
    });
  }

  const order = {
    id: crypto.randomUUID(),
    userId: user.id,
    ...contact,
    items: orderItems,
    total: orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
    status: "Received",
    createdAt: new Date().toISOString(),
  };

  orders.set(order.id, order);
  return order;
}

export function getOrdersForUser(userId) {
  return [...orders.values()]
    .filter((order) => order.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getOrderForUser(orderId, userId) {
  const order = orders.get(orderId);

  return order?.userId === userId ? order : null;
}
