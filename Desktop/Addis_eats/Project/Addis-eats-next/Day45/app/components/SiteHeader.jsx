import Link from "next/link";
import { signOutFromNavigation } from "../actions";

function NavigationLinks({ user }) {
  return (
    <>
      <Link href="/" className="nav-link">
        Home
      </Link>
      <Link href="/menu" className="nav-link">
        Menu
      </Link>
      <Link href="/cart" className="nav-link">
        Cart
      </Link>
      <Link href="/orders" className="nav-link">
        Orders
      </Link>
      {user ? (
        <details className="profile-menu">
          <summary
            className="profile-trigger"
            aria-label={`Account menu for ${user.name}`}
            title={user.name}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="21"
              height="21"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M5 21a7 7 0 0 1 14 0" />
            </svg>
          </summary>
          <div className="profile-dropdown">
            <div className="profile-details">
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </div>
            <form action={signOutFromNavigation}>
              <button type="submit" className="profile-sign-out">
                Sign Out
              </button>
            </form>
          </div>
        </details>
      ) : (
        <Link href="/sign-in" className="nav-link">
          Sign In
        </Link>
      )}
    </>
  );
}

export default function SiteHeader({ user }) {
  return (
    <header className="site-header">
      <div className="brand-block">
        <span className="brand-mark">AE</span>
        <div>
          <p className="brand-kicker">Fresh & hearty</p>
          <h1>Addis Eats</h1>
        </div>
      </div>

      <nav className="site-nav desktop-nav" aria-label="Main navigation">
        <NavigationLinks user={user} />
      </nav>

      <details className="mobile-navigation">
        <summary className="nav-toggle" aria-label="Open navigation menu">
          <span />
          <span />
          <span />
        </summary>
        <nav className="site-nav mobile-nav" aria-label="Main navigation">
          <NavigationLinks user={user} />
        </nav>
      </details>
    </header>
  );
}
