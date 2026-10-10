import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  signIn,
  sessionCookieOptions,
  SESSION_COOKIE_NAME,
} from "../lib/session";

export const metadata = {
  title: "Sign In",
  description: "Sign in to your Addis Eats account to continue your order.",
  alternates: {
    canonical: "/sign-in",
  },
};

async function handleSignIn(formData) {
  "use server";

  const emailValue = formData.get("email");
  const password = formData.get("password");
  const next = formData.get("next");
  const email =
    typeof emailValue === "string" ? emailValue.trim() : "";

  if (!email || typeof password !== "string" || !password) {
    redirect("/sign-in?error=invalid");
  }

  const result = await signIn(email, password);

  if (!result) {
    redirect("/sign-in?error=invalid");
  }

  const cookieStore = await cookies();

  cookieStore.set(
    SESSION_COOKIE_NAME,
    result.sessionId,
    sessionCookieOptions()
  );

  const destination =
    result.user.role === "staff"
      ? "/kitchen"
      : typeof next === "string" &&
          next.startsWith("/") &&
          !next.startsWith("//")
        ? next
        : "/checkout";

  redirect(destination);
}

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const next = params?.next || "/checkout";
  const hasError = params?.error === "invalid";

  return (
    <main className="page-section">
      <div className="section-heading">
        <p className="eyebrow">Welcome back</p>

        <h1>Sign In</h1>

        <p>
          Enter your email and password to continue.
        </p>
      </div>

      {hasError && (
        <p className="error-message" role="alert">
          The email or password you entered is incorrect.
        </p>
      )}

      <form action={handleSignIn} className="checkout-form">
        <input type="hidden" name="next" value={next} />

        <div className="field-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>

        <div className="field-group">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
        </div>

        <button type="submit" className="primary-button">
          Sign In
        </button>
      </form>
    </main>
  );
}