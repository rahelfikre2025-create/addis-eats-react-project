import Image from "next/image";
import Link from "next/link";
import dishes from "../public/menu-data.json";

export default async function HomePage() {
  const specials = dishes.slice(0, 2);

  return (
    <main className="page-section">
      <section className="hero-card hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">Welcome to Addis Eats</p>

          <h2>Delicious Ethiopian food, made for you.</h2>

          <p>
            Enjoy fresh dishes inspired by Ethiopian flavors and prepared with care.
          </p>

          <Link href="/menu" className="primary-button hero-button">
            Explore Menu
          </Link>
        </div>

        <div className="hero-visual" aria-label="Featured Ethiopian dish">
          <div className="hero-visual-card hero-visual-main">
            <Image
              src="/images/hroo.png"
              alt="Hroo dish"
              width={800}
              height={520}
              sizes="(max-width: 768px) 82vw, 600px"
              priority
              className="hero-image"
            />
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <p className="eyebrow">Today&apos;s Specials</p>
          <h2>Fresh from our kitchen</h2>
          <p>Try one of today&apos;s featured dishes.</p>
        </div>

        <div className="menu-grid">
          {specials.map((dish) => (
            <article className="dish-card" key={dish.id}>
              <div className="dish-image-wrap">
               <Image
               src={dish.image || "/images/doro.jpg"}
               alt={dish.name}
               width={800}
               height={540}
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
               className="dish-image"
                />
              </div>

              <div className="dish-content">
                <p className="eyebrow">{dish.category}</p>

                <h3>{dish.name}</h3>

                <p>{dish.description}</p>
              </div>

              <div className="dish-meta">
                <strong>{dish.price} ETB</strong>

                <Link href={`/menu/${dish.id}`} className="primary-button">
                  View Dish
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}