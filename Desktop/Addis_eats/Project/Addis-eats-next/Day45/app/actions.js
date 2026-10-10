
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getSession,
  SESSION_COOKIE_NAME,
  signOut,
} from "./lib/session";
import { createOrder } from "./lib/orders";
import { orderSubmissionSchema } from "./lib/validation";

export async function signOutFromNavigation() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (sessionId) {
    await signOut(sessionId);
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/sign-in");
}

export async function placeOrder(previousState, formData) {
  const user = await getSession();

  if (!user) {
    redirect("/sign-in?next=/checkout");
  }

  let items;

  try {
    items = JSON.parse(formData.get("items"));
  } catch {
    items = null;
  }

  const result = orderSubmissionSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    items,
  });

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;

    return {
      success: false,
      message: "Please correct the errors below.",
      fieldErrors,
    };
  }

  const {
    items: orderItems,
    ...contact
  } = result.data;
  const order = await createOrder({
    contact,
    items: orderItems,
    user,
  });

  if (!order) {
    return {
      success: false,
      message: "A dish in your cart is no longer available. Please update your cart.",
      fieldErrors: {},
    };
  }

  return {
    success: true,
    message: "Order placed successfully!",
    fieldErrors: {},
    orderId: order.id,
  };
}
