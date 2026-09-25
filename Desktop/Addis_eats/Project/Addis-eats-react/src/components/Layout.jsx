import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import { useAuth } from "../auth/AuthContext";
import { useFavorites } from "../favorites/FavoritesContext";
import ThemeToggle from "../theme/ThemeToogle";

function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { itemCount } = useCart();
  const { user, isSignedIn, signOut } = useAuth();
  const { favoriteCount } = useFavorites();

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="px-6 py-4 md:px-12">
          <div className="flex items-center gap-6">
            
        
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 shrink-0"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-lg">
                🍲
              </div>

              <span className="font-serif text-xl font-semibold tracking-tight">
                Addis Eats
              </span>
            </Link>

            <nav className="hidden flex-1 items-center gap-8 md:flex">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                Menu
              </NavLink>

              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                Favorites{favoriteCount > 0 ? ` (${favoriteCount})` : ""}
              </NavLink>

              {isSignedIn && (
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive
                        ? "text-accent"
                        : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  Order History
                </NavLink>
              )}

              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                Admin
              </NavLink>
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <ThemeToggle />

              <Link
                to="/cart"
                className="relative flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <span>🛒</span>
                <span>Cart</span>

                {itemCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-semibold text-accent-foreground">
                    {itemCount}
                  </span>
                )}
              </Link>

            {isSignedIn ? (
             <button
            type="button"
             onClick={signOut}
               className="flex h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm transition-colors hover:bg-secondary"
                >
              👤 {user.name}
                    </button>
                  ) : (
                   <Link
                to="/signin"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-sm transition-colors hover:bg-secondary"
                     aria-label="Sign in"
                        >
                       👤
                        </Link>
                         )}
            </div>

            
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="ml-auto flex h-10 w-10 items-center justify-center rounded-xl border border-border md:hidden"
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>

      
          {mobileMenuOpen && (
            <nav className="mt-4 border-t border-border pt-4 md:hidden">
              <div className="flex flex-col gap-2">
                <NavLink
                  to="/"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-medium ${
                      isActive
                        ? "bg-secondary text-accent"
                        : "text-muted-foreground hover:bg-secondary"
                    }`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/menu"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-medium ${
                      isActive
                        ? "bg-secondary text-accent"
                        : "text-muted-foreground hover:bg-secondary"
                    }`
                  }
                >
                  Menu
                </NavLink>

                <NavLink
                  to="/favorites"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-medium ${
                      isActive
                        ? "bg-secondary text-accent"
                        : "text-muted-foreground hover:bg-secondary"
                    }`
                  }
                >
                  Favorites{favoriteCount > 0 ? ` (${favoriteCount})` : ""}
                </NavLink>

                {isSignedIn && (
                  <NavLink
                    to="/orders"
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 text-sm font-medium ${
                        isActive
                          ? "bg-secondary text-accent"
                          : "text-muted-foreground hover:bg-secondary"
                      }`
                    }
                  >
                    Order History
                  </NavLink>
                )}

                <NavLink
                  to="/admin"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-medium ${
                      isActive
                        ? "bg-secondary text-accent"
                        : "text-muted-foreground hover:bg-secondary"
                    }`
                  }
                >
                  Admin
                </NavLink>

                <Link
                  to="/cart"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary"
                >
                  <span>Cart</span>

                  {itemCount > 0 && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                      {itemCount}
                    </span>
                  )}
                </Link>

                <div className="mt-2 border-t border-border pt-2">
                  <ThemeToggle />
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

     
      <main className="fade-in">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
          <div className="grid gap-10 md:grid-cols-4">
            
    
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-lg">
                  🍲
                </div>

                <span className="font-serif text-xl font-semibold">
                  Addis Eats
                </span>
              </div>

              <p className="max-w-xs text-sm leading-6 text-muted-foreground">
                Discover delicious Ethiopian favorites and comfort food,
                delivered right to your door.
              </p>
            </div>

        
            <div>
              <h3 className="mb-4 font-serif text-base font-semibold">
                Explore
              </h3>

              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <Link
                  to="/"
                  className="transition-colors hover:text-foreground"
                >
                  Home
                </Link>

                <Link
                  to="/menu"
                  className="transition-colors hover:text-foreground"
                >
                  Menu
                </Link>

                <Link
                  to="/cart"
                  className="transition-colors hover:text-foreground"
                >
                  Cart
                </Link>

                <Link
                  to="/favorites"
                  className="transition-colors hover:text-foreground"
                >
                  Favorites
                </Link>
              </div>
            </div>

          
            <div>
              <h3 className="mb-4 font-serif text-base font-semibold">
                Contact
              </h3>

              <div className="space-y-3 text-sm text-muted-foreground">
                <p>📍 Addis Ababa, Ethiopia</p>
                <p>📞 +251 900 000 000</p>
                <p>✉️ hello@addiseats.com</p>
              </div>
            </div>

       
            <div>
              <h3 className="mb-4 font-serif text-base font-semibold">
                Follow us
              </h3>

              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-sm transition-colors hover:bg-secondary"
                  aria-label="Facebook"
                >
                  f
                </button>

                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-sm transition-colors hover:bg-secondary"
                  aria-label="Instagram"
                >
                  ◎
                </button>

                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-sm transition-colors hover:bg-secondary"
                  aria-label="Telegram"
                >
                  ➤
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
            © 2026 Addis Eats. Made with ❤️ in Ethiopia.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;