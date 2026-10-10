import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "../../components/AddToCartButton";
import dishes from "../../../public/menu-data.json";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const dish = dishes.find(
    (item) => String(item.id) === id
  );

  if (!dish) {
    return {
      title: "Dish not found",
    };
  }

  return {
    title: dish.name,
    description: `${dish.name} — ${dish.price} ETB. ${dish.description}`,
    alternates: {
      canonical: `/menu/${id}`,
    },
  };
}

export async function generateStaticParams() {
  return dishes.map((dish) => ({
    id: String(dish.id),
  }));
}

export default async function DishPage({ params }) {
  const { id } = await params;

  const dish = dishes.find(
    (item) => String(item.id) === id
  );

  if (!dish) {
    notFound();
  }

  const pageUrl = `https://addiseats.et/menu/${encodeURIComponent(id)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${pageUrl}#product`,
    name: dish.name,
    description: dish.description,
    image: new URL(
      dish.image || "/images/doro.jpg",
      "https://addiseats.et"
    ).toString(),
    category: dish.category,
    offers: {
      "@type": "Offer",
      url: pageUrl,
      price: dish.price,
      priceCurrency: "ETB",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="page-section">
        <div className="content-card dish-detail-layout">
          <div className="dish-detail-image">
            <Image
              src={dish.image || "/images/doro.jpg"}
              alt={dish.name}
              width={900}
              height={700}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="dish-image"
            />
          </div>

          <div className="dish-detail-copy">
            <p className="eyebrow">Signature dish</p>
            <h1>{dish.name}</h1>

            <div className="detail-pill-row">
              <span className="detail-pill">{dish.category}</span>
              <span className="detail-pill">{dish.price} ETB</span>
            </div>

            <p>{dish.description}</p>

            <AddToCartButton dish={dish} />
          </div>
        </div>
      </section>
    </>
  );
}