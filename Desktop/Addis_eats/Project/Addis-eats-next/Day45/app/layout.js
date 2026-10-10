import "./globals.css";
import { getSession } from "./lib/session";
import { CartProvider } from "./context/CartContext";
import { Fraunces, Outfit } from "next/font/google";
import SiteHeader from "./components/SiteHeader";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit-custom",
});

export const metadata = {
  metadataBase: new URL("https://addiseats.et"),
  title: {
    template: "%s · Addis Eats",
    default: "Addis Eats — food delivery in Addis Ababa",
  },
  description:
    "Order delicious Ethiopian food from Addis Eats and enjoy fresh meals delivered across Addis Ababa.",
};

export default async function RootLayout({ children }) {
  const user = await getSession();

  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable}`}>
      <body>
        <div className="app-shell">
          <SiteHeader user={user} />

          <main className="site-main">
            <CartProvider>{children}</CartProvider>
          </main>

          <footer className="site-footer">
            <p>© 2026 Addis Eats</p>
          </footer>
        </div>
      </body>
    </html>
  );
}