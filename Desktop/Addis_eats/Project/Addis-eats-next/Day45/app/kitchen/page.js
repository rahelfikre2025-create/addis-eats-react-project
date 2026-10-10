import { redirect } from "next/navigation";
import { getSession } from "../lib/session";

export default async function KitchenPage() {
  const user = await getSession();

  if (!user) {
    redirect("/sign-in?next=/kitchen");
  }

  if (user.role !== "staff") {
    return (
      <main className="page-section">
        <div className="section-heading">
          <p className="eyebrow">Access denied</p>
          <h1>Kitchen</h1>
          <p>
            You do not have permission to access the kitchen.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="page-section">
      <div className="section-heading">
        <p className="eyebrow">Staff area</p>
        <h1>Kitchen Dashboard</h1>
        <p>
          Welcome, {user.name}. You can manage kitchen orders here.
        </p>
      </div>
    </main>
  );
}