import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const ORDER_STORAGE_KEY = "addis-eats-orders";

const STATUS_STYLES = {
  Pending: "border-accent/30 bg-accent/10 text-accent",
  Confirmed: "border-blue-500/30 bg-blue-500/10 text-blue-700",
  Preparing: "border-amber-500/30 bg-amber-500/10 text-amber-700",
  "Out for Delivery": "border-purple-500/30 bg-purple-500/10 text-purple-700",
  Delivered: "border-success/30 bg-green-500/10 text-green-700",
};

function readOrders() {
  try {
    const savedOrders = localStorage.getItem(ORDER_STORAGE_KEY);

    if (!savedOrders) {
      return { orders: [], error: "" };
    }

    const parsedOrders = JSON.parse(savedOrders);

    if (!Array.isArray(parsedOrders)) {
      throw new Error("Saved orders are not an array.");
    }

    return {
      orders: parsedOrders.filter((order) => order && typeof order === "object"),
      error: "",
    };
  } catch (error) {
    console.error("Failed to load order history:", error);
    return {
      orders: [],
      error: "We could not read your saved orders. Please try placing an order again.",
    };
  }
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "Date unavailable";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleString();
}

function getOrderTime(order) {
  const createdAtTime = new Date(order.createdAt).getTime();

  if (!Number.isNaN(createdAtTime)) {
    return createdAtTime;
  }

  return typeof order.id === "number" ? order.id : 0;
}

function formatMoney(value) {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount.toLocaleString() : "0";
}

function OrderCard({ order }) {
  const customer = order.customer && typeof order.customer === "object"
    ? order.customer
    : {};
  const items = Array.isArray(order.items) ? order.items : [];
  const status = order.status || "Pending";
  const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.Pending;

  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-6">
      <div className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-semibold text-foreground">
            Order #{order.id ?? "Unavailable"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatDate(order.createdAt)}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 md:justify-end">
          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle}`}>
            {status}
          </span>
          <span className="text-lg font-bold text-foreground">
            {formatMoney(order.total)} ETB
          </span>
        </div>
      </div>

      <div className="grid gap-5 border-b border-border py-5 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Customer
          </p>
          <p className="mt-1 font-semibold text-foreground">
            {customer.name || "Not provided"}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Phone
          </p>
          <p className="mt-1 font-semibold text-foreground">
            {customer.phone || "Not provided"}
          </p>
        </div>

        <div className="sm:col-span-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Delivery Area
          </p>
          <p className="mt-1 font-semibold text-foreground">
            {customer.deliveryArea || "Not provided"}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-secondary/50 p-4">
        <p className="mb-3 text-sm font-semibold text-foreground">
          Ordered Dishes
        </p>

        {items.length > 0 ? (
          <div className="space-y-3">
            {items.map((item, index) => {
              const quantity = Number(item.quantity) || 0;
              const price = Number(item.price) || 0;

              return (
                <div
                  key={`${item.id ?? item.name ?? "item"}-${index}`}
                  className="flex items-start justify-between gap-4 text-sm"
                >
                  <span className="text-muted-foreground">
                    {item.name || "Unnamed dish"} × {quantity}
                  </span>
                  <span className="shrink-0 font-medium text-foreground">
                    {formatMoney(price * quantity)} ETB
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No dish details were saved for this order.
          </p>
        )}
      </div>

      {customer.notes && (
        <div className="mt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Special Instructions
          </p>
          <p className="mt-1 text-sm text-foreground">{customer.notes}</p>
        </div>
      )}
    </article>
  );
}

function OrderHistory() {
  const [result] = useState(readOrders);

  const orders = useMemo(
    () =>
      result.orders
        .slice()
        .sort((firstOrder, secondOrder) => getOrderTime(secondOrder) - getOrderTime(firstOrder)),
    [result.orders]
  );

  return (
    <div className="fade-in">
      <section className="border-b border-border px-6 pb-10 pt-12 md:px-12 md:pt-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
            Your account
          </p>
          <h1 className="font-serif text-4xl font-light md:text-5xl">
            My Order History
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
            Review your previous Addis Eats orders and delivery information.
          </p>
        </div>
      </section>

      <section className="px-6 py-10 md:px-12 md:py-12">
        <div className="mx-auto max-w-5xl">
          {result.error && (
            <div className="mb-6 rounded-2xl border border-error/20 bg-error/10 px-6 py-5 text-sm text-error">
              {result.error}
            </div>
          )}

          {orders.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center shadow-sm">
              <div className="mb-4 text-5xl">📦</div>
              <h2 className="font-serif text-3xl">You haven't placed any orders yet.</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                Explore our menu and place your first order.
              </p>
              <Link
                to="/menu"
                className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Explore the menu
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              <p className="text-sm text-muted-foreground">
                {orders.length} {orders.length === 1 ? "order" : "orders"}
              </p>
              {orders.map((order, index) => (
                <OrderCard key={order.id ?? `order-${index}`} order={order} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default OrderHistory;
