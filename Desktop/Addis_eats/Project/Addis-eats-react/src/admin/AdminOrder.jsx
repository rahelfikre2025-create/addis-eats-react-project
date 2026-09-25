
import { useEffect, useState } from "react";

const ORDER_STATUSES = [
  "Pending",
  "Confirmed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
];

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem("addis-eats-orders");

      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  }, []);

  function updateOrderStatus(orderId, newStatus) {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, status: newStatus }
        : order
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "addis-eats-orders",
      JSON.stringify(updatedOrders)
    );
  }

  function formatDate(date) {
    return new Date(date).toLocaleString();
  }

  return (
    <section>
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-accent">
          Addis Eats
        </p>

        <h1 className="mt-1 font-serif text-3xl font-bold text-foreground">
          Orders
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Manage customer orders and update their status.
        </p>
      </div>

      {/* Empty State */}
      {orders.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
          <div className="mb-4 text-5xl">📦</div>

          <h2 className="font-serif text-2xl font-bold text-foreground">
            No orders yet
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Customer orders will appear here after checkout.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {orders
            .slice()
            .reverse()
            .map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                {/* Order Header */}
                <div className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-foreground">
                      Order #{order.id}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-foreground">
                      {order.total.toLocaleString()} ETB
                    </span>

                    <select
                      value={order.status}
                      onChange={(event) =>
                        updateOrderStatus(
                          order.id,
                          event.target.value
                        )
                      }
                      className="rounded-xl border border-border bg-background px-3 py-2 text-sm font-medium text-foreground outline-none focus:border-accent"
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Customer */}
                <div className="grid gap-5 py-5 md:grid-cols-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Customer
                    </p>

                    <p className="mt-1 font-semibold text-foreground">
                      {order.customer.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Phone
                    </p>

                    <p className="mt-1 font-semibold text-foreground">
                      {order.customer.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Delivery Area
                    </p>

                    <p className="mt-1 font-semibold text-foreground">
                      {order.customer.deliveryArea}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="rounded-xl bg-secondary/50 p-4">
                  <p className="mb-3 text-sm font-semibold text-foreground">
                    Order Items
                  </p>

                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">
                          {item.name} × {item.quantity}
                        </span>

                        <span className="font-medium text-foreground">
                          {(item.price * item.quantity).toLocaleString()} ETB
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {order.customer.notes && (
                  <div className="mt-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Special Instructions
                    </p>

                    <p className="mt-1 text-sm text-foreground">
                      {order.customer.notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </section>
  );
}

export default AdminOrders;

