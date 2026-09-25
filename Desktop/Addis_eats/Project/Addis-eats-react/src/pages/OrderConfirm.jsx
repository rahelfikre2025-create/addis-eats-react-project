
import { Link } from "react-router-dom";

function OrderConfirm() {
  return (
    <section className="min-h-[70vh] bg-background px-6 py-12">
      <div className="mx-auto max-w-5xl">

       
        <Link
          to="/menu"
          className="inline-flex items-center text-sm font-medium text-muted-foreground transition hover:text-accent"
        >
          ← Back to Menu
        </Link>

        <div className="mt-12 flex justify-center">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">

            
            <div className="mb-5 text-6xl">
              🎉
            </div>

            <h1 className="font-serif text-3xl font-bold text-foreground">
              Order Successfully Submitted!
            </h1>

            <p className="mt-4 leading-6 text-muted-foreground">
              Thank you for ordering with Addis Eats.
              Your order has been received and we’ll prepare it for delivery.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}

export default OrderConfirm;


