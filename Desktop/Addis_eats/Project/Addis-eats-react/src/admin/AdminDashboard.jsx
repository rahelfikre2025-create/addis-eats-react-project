
import { useEffect, useMemo, useState } from "react";

const ORDER_KEY = "addis-eats-orders";
const MENU_KEY = "addis-eats-admin-menu";
const ORDER_STATUSES = ["Pending", "Confirmed", "Preparing", "Out for Delivery", "Delivered"];

const STATUS_STYLES = {
  Pending: "bg-accent/10 text-accent",
  Confirmed: "bg-blue-500/10 text-blue-700",
  Preparing: "bg-amber-500/10 text-amber-700",
  "Out for Delivery": "bg-purple-500/10 text-purple-700",
  Delivered: "bg-success/15 text-success",
};

function readStorageArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch (error) {
    console.error(`Failed to load ${key}:`, error);
    return [];
  }
}

function formatMoney(value) {
  return `${(Number(value) || 0).toLocaleString()} ETB`;
}

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date unavailable" : date.toLocaleString();
}

function isToday(value) {
  const date = new Date(value);
  const today = new Date();

  return (
    !Number.isNaN(date.getTime()) &&
    date.toDateString() === today.toDateString()
  );
}

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadAnalyticsData() {
      setOrders(readStorageArray(ORDER_KEY));

      const savedMenu = readStorageArray(MENU_KEY);

      if (savedMenu.length > 0) {
        if (active) {
          setMenu(savedMenu);
        }
        return;
      }

      try {
        const response = await fetch("/menu-data.json");

        if (!response.ok) {
          throw new Error("Failed to load menu data.");
        }

        const defaultMenu = await response.json();

        if (active && Array.isArray(defaultMenu)) {
          setMenu(defaultMenu);
        }
      } catch (error) {
        console.error("Failed to load menu analytics:", error);
      }
    }

    loadAnalyticsData();

    return () => {
      active = false;
    };
  }, []);

  const analytics = useMemo(() => {
    const validOrders = orders.filter((order) => order && typeof order === "object");
    const todayOrders = validOrders.filter((order) => isToday(order.createdAt));
    const revenue = validOrders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
    const todayRevenue = todayOrders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
    const pendingOrders = validOrders.filter((order) => order.status === "Pending").length;

    const statusCounts = ORDER_STATUSES.map((status) => ({
      status,
      count: validOrders.filter((order) => order.status === status).length,
    }));

    const dishCounts = {};
    validOrders.forEach((order) => {
      (Array.isArray(order.items) ? order.items : []).forEach((item) => {
        const name = item.name || "Unnamed dish";
        dishCounts[name] = (dishCounts[name] || 0) + (Number(item.quantity) || 0);
      });
    });

    const topDishes = Object.entries(dishCounts)
      .map(([name, quantity]) => ({ name, quantity }))
      .sort((first, second) => second.quantity - first.quantity)
      .slice(0, 5);

    return {
      validOrders,
      todayOrders,
      revenue,
      todayRevenue,
      pendingOrders,
      statusCounts,
      topDishes,
    };
  }, [orders]);

  const stats = [
    { label: "Total Orders", value: analytics.validOrders.length.toLocaleString(), detail: `${analytics.todayOrders.length} today`, icon: "📦" },
    { label: "Total Revenue", value: formatMoney(analytics.revenue), detail: `${formatMoney(analytics.todayRevenue)} today`, icon: "💰" },
    { label: "Available Menu", value: menu.filter((dish) => dish.available !== false).length.toLocaleString(), detail: `${menu.length} total items`, icon: "🍽️" },
    { label: "Pending Orders", value: analytics.pendingOrders.toLocaleString(), detail: "Need attention", icon: "⏳" },
  ];

  const recentOrders = analytics.validOrders
    .slice()
    .sort((first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime())
    .slice(0, 5);

  return (
    <section>
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-accent">
          Addis Eats
        </p>

        <h1 className="mt-1 font-serif text-3xl font-bold text-foreground">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Overview of your restaurant activity.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">
                {stat.icon}
              </span>

              <span className="text-xs font-medium text-muted-foreground">
                {stat.detail}
              </span>
            </div>

            <p className="mt-5 text-sm text-muted-foreground">
              {stat.label}
            </p>

            <p className="mt-1 text-2xl font-bold text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        {/* Recent Orders */}
        <div className="rounded-2xl border border-border bg-card shadow-sm">
        <div className="border-b border-border p-5">
          <h2 className="font-serif text-xl font-bold text-foreground">
            Recent Orders
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Latest orders placed by customers.
          </p>
        </div>

          <div className="divide-y divide-border">
            {recentOrders.length === 0 && (
              <p className="p-6 text-sm text-muted-foreground">No orders have been placed yet.</p>
            )}
            {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-foreground">
                  Order #{order.id ?? "Unavailable"}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {order.customer?.name || "Customer unavailable"} · {formatDate(order.createdAt)}
                </p>
              </div>

              <div className="flex items-center gap-5">
                <span className="text-sm font-semibold text-foreground">
                  {formatMoney(order.total)}
                </span>

                <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[order.status] || STATUS_STYLES.Pending}`}>
                  {order.status || "Pending"}
                </span>
              </div>
            </div>
            ))}
          </div>
        </div>

        {/* Popular dishes */}
        <div className="rounded-2xl border border-border bg-card shadow-sm">
          <div className="border-b border-border p-5">
            <h2 className="font-serif text-xl font-bold text-foreground">Popular Dishes</h2>
            <p className="mt-1 text-sm text-muted-foreground">Most ordered items.</p>
          </div>
          <div className="p-5">
            {analytics.topDishes.length === 0 ? (
              <p className="text-sm text-muted-foreground">Popular dishes will appear after orders are placed.</p>
            ) : (
              <div className="space-y-4">
                {analytics.topDishes.map((dish, index) => (
                  <div key={dish.name} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-foreground">
                      {index + 1}
                    </span>
                    <span className="flex-1 text-sm font-medium text-foreground">{dish.name}</span>
                    <span className="text-sm text-muted-foreground">{dish.quantity} sold</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status overview */}
      <div className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="font-serif text-xl font-bold text-foreground">Order Status Overview</h2>
          <p className="mt-1 text-sm text-muted-foreground">Current order pipeline.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {analytics.statusCounts.map((item) => (
            <div key={item.status} className="rounded-xl bg-secondary/60 p-4">
              <p className="text-sm text-muted-foreground">{item.status}</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{item.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;

