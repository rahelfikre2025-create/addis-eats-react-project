"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export default function PaginatedDishes({ category }) {
  const [page, setPage] = useState(1);
  const query = new URLSearchParams({ page: String(page) });

  if (category && category !== "All") {
    query.set("category", category);
  }

  const { data, error, isLoading } = useSWR(
    `/api/dishes?${query}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  if (error) {
    return <p>Could not load dishes.</p>;
  }

  if (isLoading && !data) {
    return <p>Loading dishes...</p>;
  }

  const dishes = data?.dishes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <section className="paginated-menu">
      <div className="menu-grid">
        {dishes.length === 0 ? (
          <div className="content-card empty-state full-width-empty">
            <h2>No dishes found</h2>
            <p>There are no dishes in this category right now.</p>
          </div>
        ) : (
          dishes.map((dish, index) => (
            <article className="dish-card" key={dish.id}>
              <div className="dish-image-wrap">
                <Image
                  src={dish.image || "/images/doro.jpg"}
                  alt={dish.name}
                  width={800}
                  height={540}
                  sizes="(max-width: 420px) 100vw, (max-width: 850px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  preload={page === 1 && index === 0}
                  className="dish-image"
                />
              </div>

              <div className="dish-content">
                <p className="eyebrow">{dish.category}</p>
                <h2>{dish.name}</h2>
                <p>{dish.description}</p>
              </div>

              <div className="dish-meta">
                <strong>{dish.price} ETB</strong>
                <Link href={`/menu/${dish.id}`} className="primary-button">
                  View Dish
                </Link>
              </div>
            </article>
          ))
        )}
      </div>

      <div className="pagination-controls">
        <button
          type="button"
          className="secondary-button"
          onClick={() => setPage((currentPage) => currentPage - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          type="button"
          className="primary-button"
          onClick={() => setPage((currentPage) => currentPage + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
}