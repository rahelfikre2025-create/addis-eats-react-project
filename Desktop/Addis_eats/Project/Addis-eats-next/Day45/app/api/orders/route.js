
import { getSession } from "../../lib/session";
import { createOrder, getOrdersForUser } from "../../lib/orders";
import { orderSubmissionSchema } from "../../lib/validation";

export async function GET() {
  const user = await getSession();

  if (!user) {
    return Response.json({ error: "Not signed in." }, { status: 401 });
  }

  return Response.json({ orders: getOrdersForUser(user.id) });
}

export async function POST(request) {
  const user = await getSession();

  if (!user) {
    return Response.json({ error: "Not signed in." }, { status: 401 });
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const result = orderSubmissionSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      {
        error: "Validation failed.",
        fieldErrors: result.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const { items, ...contact } = result.data;
  const order = await createOrder({
    contact,
    items,
    user,
  });

  if (!order) {
    return Response.json(
      { error: "A dish in the cart is no longer available." },
      { status: 422 }
    );
  }

  return Response.json(
    { message: "Order created successfully.", order },
    { status: 201 }
  );
}
