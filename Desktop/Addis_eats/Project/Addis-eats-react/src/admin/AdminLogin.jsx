import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { adminSignIn } = useAdminAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";

  function handleSubmit(event) {
    event.preventDefault();

    setError("");

    const success = adminSignIn(email.trim(), password);

    if (!success) {
      setError("Invalid admin email or password.");
      return;
    }

    navigate(from, { replace: true });
  }

  return (
    <section className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto flex max-w-md flex-col items-center">
        <div className="mb-8 text-center">
          <div className="mb-4 text-5xl">🍲</div>

          <h1 className="font-serif text-4xl font-bold text-foreground">
            Addis Eats
          </h1>

          <p className="mt-2 text-sm text-accent">
            Admin Panel
          </p>

          <p className="mt-3 text-sm text-muted-foreground">
            Sign in to manage your restaurant.
          </p>
        </div>

        <div className="w-full rounded-2xl border border-border bg-card p-7 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="admin-email"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Admin Email
              </label>

              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@addiseats.com"
                autoComplete="email"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Password
              </label>

              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter admin password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 border-t border-border pt-5 text-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-sm font-medium text-muted-foreground transition hover:text-accent"
            >
              ← Back to Store
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;

