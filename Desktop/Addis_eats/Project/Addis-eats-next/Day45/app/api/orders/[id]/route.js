import { getSession } from "../../../lib/session";
import { getOrderForUser } from "../../../lib/orders";

export async function GET(request, { params }) {
  const user = await getSession();

  if (!user) {
    return Response.json({ error: "Not signed in." }, { status: 401 });
  }

  const { id } = await params;
  const order = getOrderForUser(id, user.id);

  if (!order) {
    return Response.json({ error: "Order not found." }, { status: 404 });
  }

  return Response.json(order);
}