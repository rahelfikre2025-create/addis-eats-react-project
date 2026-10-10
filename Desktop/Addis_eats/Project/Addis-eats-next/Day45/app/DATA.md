# Addis Eats — Data Fetching Notes

## 1. Shared Fetcher

The project uses one shared fetcher:

```js
export const fetcher = (url) =>
  fetch(url).then((res) => res.json());
```

SWR uses this function whenever it needs to request data from an API.

---

## 2. Order Status

### Query Key

```text
/api/orders/${id}
```

Example:

```text
/api/orders/1
```

### Why this key?

The order ID identifies the specific order.

When the ID changes, SWR requests a different order.

### SWR settings

```js
{
  fallbackData: initial,
  refreshInterval: 5000,
}
```

### `fallbackData`

The server fetches the order first and sends the data to the client as `initial`.

`fallbackData` allows SWR to show that server-rendered data immediately, so there is no loading spinner on the first paint.

### `refreshInterval: 5000`

The order status is checked every 5 seconds.

This is useful because an order status can change while the customer is waiting.

---

## 3. Menu Search

### Query Key

```text
/api/dishes?q=${debouncedTerm}
```

Example:

```text
/api/dishes?q=tibs
```

### Why this key?

The search term is part of the key.

When the search term changes, the SWR key changes, so SWR requests the results for the new search.

### Empty Search

When there is no search term, the SWR key is:

```js
null
```

A `null` key tells SWR not to fetch anything.

### Debouncing

The search input waits 300 milliseconds before updating the search term used by SWR.

This prevents a request from being sent for every single keystroke.

### `keepPreviousData`

```js
{
  keepPreviousData: true,
}
```

This keeps the previous results visible while the new search results are loading.

It prevents the list from flashing empty between searches.

---

## 4. Pagination

### Query Key

```text
/api/dishes?page=${page}
```

Examples:

```text
/api/dishes?page=1
/api/dishes?page=2
```

### Why is the page number in the key?

Each page represents different data.

Putting the page number in the SWR key allows SWR to keep the results for each page separately.

### Page Size

The API returns 4 dishes per page.

With 8 dishes:

```text
Page 1 → dishes 1–4
Page 2 → dishes 5–8
```

### `keepPreviousData`

Pagination also uses:

```js
{
  keepPreviousData: true,
}
```

This keeps the previous page visible while the next page is loading, avoiding an empty flash between pages.

---

## 5. Summary of Query Keys

| Feature         | Query Key                        | Purpose                          |
| --------------- | -------------------------------- | -------------------------------- |
| Order status    | `/api/orders/${id}`              | Fetch one specific order         |
| Menu search     | `/api/dishes?q=${debouncedTerm}` | Fetch dishes matching the search |
| Menu pagination | `/api/dishes?page=${page}`       | Fetch a specific page of dishes  |

---

## 6. Why SWR Is Used

SWR is useful for the client-side parts of Addis Eats because these features need changing browser data:

* Order status polling
* Search-as-you-type
* Pagination

The server still renders the initial data where appropriate, while SWR handles the browser-side fetching, caching, revalidation, and race-condition safety.
