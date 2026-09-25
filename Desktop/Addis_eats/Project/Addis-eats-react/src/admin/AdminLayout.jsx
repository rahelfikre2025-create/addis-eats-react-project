
import { NavLink, Outlet, Link } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";

function AdminLayout() {
  const { adminSignOut } = useAdminAuth();

  const navLinkClass = ({ isActive }) =>
    `block rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
    }`;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen flex-col md:flex-row">

      
        <aside className="w-full border-b border-border bg-card md:min-h-screen md:w-64 md:border-b-0 md:border-r">
          <div className="flex h-full flex-col p-5">

           
            <div className="mb-8">
              <Link
                to="/admin"
                className="flex items-center gap-3"
              >
                <span className="text-3xl">🍲</span>

                <div>
                  <h1 className="font-serif text-xl font-bold text-foreground">
                    Addis Eats
                  </h1>

                  <p className="text-xs text-muted-foreground">
                    Admin Panel
                  </p>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <NavLink
                to="/admin"
                end
                className={navLinkClass}
              >
                📊 Dashboard
              </NavLink>

              <NavLink
                to="/admin/menu"
                className={navLinkClass}
              >
                🍽️ Menu
              </NavLink>

              <NavLink
                to="/admin/orders"
                className={navLinkClass}
              >
                📦 Orders
              </NavLink>
            </nav>

            {/* Back to store */}
            <div className="mt-auto pt-8">
              <button
                type="button"
                onClick={adminSignOut}
                className="mb-3 block w-full rounded-xl border border-error/30 px-4 py-3 text-center text-sm font-medium text-error transition hover:bg-error/10"
              >
                Sign out
              </button>

              <Link
                to="/"
                className="block rounded-xl border border-border px-4 py-3 text-center text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              >
                ← Back to Store
              </Link>
            </div>

          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          <div className="mx-auto max-w-7xl p-6 md:p-8">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;

