import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "../lib/session";
import { getOrdersForUser } from "../lib/orders";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const user = await getSession();

  if (!user) {
    redirect("/sign-in?next=/orders");
  }

  const orders = getOrdersForUser(user.id);

  return (
    <main className="page-section">
      <div className="section-heading">
        <p className="eyebrow">Your account</p>
        <h1>Your Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="content-card empty-state">
          <h2>No orders yet</h2>
          <p>Orders you place will appear here.</p>
          <Link href="/menu" className="primary-button">
            Browse the Menu
          </Link>
        </div>
      ) : (
        <div className="content-card order-list">
          {orders.map((order) => (
            <Link
              href={`/orders/${order.id}`}
              className="order-item"
              key={order.id}
            >
              <div className="order-copy">
                <h2>Order #{order.id.slice(0, 8)}</h2>
                <p>{new Date(order.createdAt).toLocaleString()}</p>
                <p>{order.status}</p>
              </div>
              <p className="order-total">{order.total} ETB</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
