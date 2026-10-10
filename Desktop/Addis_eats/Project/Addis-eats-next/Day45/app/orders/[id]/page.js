import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import { getOrderForUser } from "../../lib/orders";
import OrderStatus from "./OrderStatus";

export default async function OrderPage({ params }) {
  const user = await getSession();

  if (!user) {
    redirect("/sign-in?next=/orders");
  }

  const { id } = await params;
  const order = getOrderForUser(id, user.id);

  if (!order) {
    return (
      <main className="page-section">
        <h1>Unable to load order</h1>
        <p>You may not have permission to view this order.</p>
      </main>
    );
  }

  return <OrderStatus id={id} initial={order} />;
}