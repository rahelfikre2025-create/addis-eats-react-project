"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export default function SearchBox() {
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // Wait 300ms after typing stops
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(term.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [term]);

  const { data, error, isLoading } = useSWR(
    debouncedTerm
      ? `/api/dishes?q=${encodeURIComponent(debouncedTerm)}`
      : null,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  const dishes = Array.isArray(data) ? data : data?.dishes ?? [];

  return (
    <section>
      <input
        type="search"
        placeholder="Search dishes..."
        value={term}
        onChange={(event) => setTerm(event.target.value)}
      />

      {error && <p>Could not load dishes.</p>}

      {isLoading && !data && <p>Loading dishes...</p>}

      {debouncedTerm && (
        <ul>
          {dishes.map((dish) => (
            <li key={dish.id}>
              {dish.name}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}