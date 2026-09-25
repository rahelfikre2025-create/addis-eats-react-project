import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContext";

function Cart() {
    
   const {
    cartItems,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
   } = useCart();
 
  const deliveryFee = cartItems.length > 0 ? 80 : 0;
  const grandTotal = total + deliveryFee;

   if(cartItems.length === 0) {
    return(
        
      <main className="min-h-[70vh] px-6 py-16 md:px-12">
        
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-card text-4xl">
            
            🛒
          </div>

          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent">
            Your order
          </p>

          <h1 className="font-serif text-4xl font-light text-foreground md:text-5xl">
            Your cart is empty
          </h1>

          <p className="mt-4 max-w-md text-muted-foreground">
            Looks like you haven't added anything to your
            order yet. Explore our menu and discover
            something delicious.
          </p>

          <Link
            to="/menu"
            className="mt-8 inline-flex items-center rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            Browse Menu
          </Link>
        </div>
      </main>
    );
   }

      total 

    return(

 <main className="fade-in px-6 py-10 md:px-12 md:py-14">
  <div className="mx-auto max-w-6xl">
       <div className="mb-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent">
            Your order
          </p>

          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-serif text-4xl font-light text-foreground md:text-5xl">
                Your Cart
              </h1>

              <p className="mt-2 text-muted-foreground">
                {cartItems.length}{" "}
                {cartItems.length === 1 ? "dish" : "dishes"}{" "}
                · {cartItems.reduce(
                  (count, item) => count + item.quantity,
                  0
                )}{" "}
                items
              </p>
            </div>

            <button
              type="button"
              onClick={clearCart}
              className="self-start text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-[var(--error)] hover:underline md:self-auto"
            >
              Clear cart
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
                {cartItems.map((item) => (
                    <article key={item.id}
                    className="overflow-hidden rounded-[var(--radius)] border border-border bg-card"
                    >
                    <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
                      <div className="h-28 w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:h-28 sm:w-36"
                    
                      >
                         <img 
                         src= {item.image}
                         alt= {item.name}
                        className="h-full w-full object-cover"
                        />

                      </div>
                      <div className="min-w-0 flex-1">
                       <p className="mb-1 text-xs font-medium uppercase tracking-wider text-accent">
                        {item.category}
                       </p>

                     <h2 className="font-serif text-2xl font-light text-foreground">
                      {item.name}
                    </h2>

                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {item.description}
                    </p>

                      <p className="mt-3 font-medium text-foreground">
                      {item.price} ETB
                    </p>

                      </div>

                      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <div className="flex items-center rounded-full border border-border bg-background">
                              <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                        aria-label={`Decrease ${item.name} quantity`}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-muted-foreground transition-colors hover:text-foreground"
                      >
                        −
                      </button>

                       <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>

                          <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                        aria-label={`Increase ${item.name} quantity`}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-muted-foreground transition-colors hover:text-foreground"
                      >
                        +
                      </button>

                      </div>
                         <button
                      type="button"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      className="text-sm text-muted-foreground transition-colors hover:text-[var(--error)]"
                    >
                      Remove
                    </button>

                      </div>
                    </div>
                         <div className="flex items-center justify-between border-t border-border px-5 py-3 text-sm">
                  <span className="text-muted-foreground">
                    Item subtotal
                  </span>

                  <span className="font-medium text-foreground">
                    {item.price * item.quantity} ETB
                  </span>
                </div>

                    </article>
                ))}

            </div>
            
            <aside className="lg:sticky lg:top-28 lg:h-fit">
                <div className="rounded-[var(--radius)] border border-border bg-card p-6">
                    <h2 className="font-serif text-2xl font-light text-foreground">
                        Order Summery
                    </h2>
                    <div className="mt-6 space-y-4 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">
                                Subtotal

                            </span>
                            <span className="font-medium text-foreground">
                              {total} ETB
                              </span>
                        </div>
                            
                            <div className="flex justify-between">
                                  <span className="text-muted-foreground">
                                     Delivery
                                  </span>

                                  <span className="font-medium text-foreground">
                                   {deliveryFee} ETB
                                    </span>
                            </div>
                           <div className="border-t border-border pt-4">
                               <div className="flex items-end justify-between">
                                 <span className="font-medium text-foreground">
                                     Total
                                   </span>

                                   <span className="font-serif text-2xl text-foreground">
                                    {grandTotal} ETB
                                    </span>
                               </div>
                            </div> 
                    </div>

              <Link
                to="/checkout"
                className="mt-6 flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.02]"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/menu"
                className="mt-3 flex w-full items-center justify-center rounded-full border border-border px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Continue Shopping
              </Link>

              <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
                Delivery fee is currently 80 ETB for Addis
                Eats orders.
              </p>
                </div>

            </aside>

        </div>

  </div>
 </main>
    );
}

export default Cart;