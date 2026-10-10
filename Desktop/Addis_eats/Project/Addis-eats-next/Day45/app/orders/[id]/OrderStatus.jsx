"use client";

import useSWR from "swr";

async function orderFetcher(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not load the order.");
  }

  return response.json();
}

export default function OrderStatus({ id, initial }) {
  const { data, error } = useSWR(
    `/api/orders/${id}`,
    orderFetcher,
    {
      fallbackData: initial,
      refreshInterval: 5000,
    }
  );

  if (error) {
    return <p>Could not load the order.</p>;
  }

  const orderId = typeof data?.id === "string" ? data.id : null;

  if (!orderId || !Array.isArray(data.items)) {
    return <p>Order details are unavailable.</p>;
  }

  return (
    <main className="page-section">
      <div className="section-heading">
        <p className="eyebrow">Order confirmation</p>
        <h1>Order #{orderId.slice(0, 8)}</h1>
        <p>Status: {data.status}</p>
      </div>

      <div className="checkout-layout">
        <div className="content-card order-list">
          {data.items.map((item) => (
            <div className="order-item" key={item.id}>
              <div className="order-copy">
                <h2>{item.name}</h2>
                <p>
                  {item.price} ETB × {item.quantity}
                </p>
              </div>
              <p className="order-total">
                {item.price * item.quantity} ETB
              </p>
            </div>
          ))}
        </div>

        <aside className="summary-card content-card">
          <h2>Delivery details</h2>
          <p>{data.name}</p>
          <p>{data.phone}</p>
          <p>{data.address}</p>
          <p className="order-total">Total: {data.total} ETB</p>
        </aside>
      </div>
    </main>
  );
}