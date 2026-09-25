import { useState } from "react";
import { useCart } from "../cart/CartContext";
import { useNavigate } from "react-router-dom";


function Checkout() {
   const {
    cartItems, 
    total,
    clearCart,       
        } = useCart();

   const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
  name: "",
  phone: "",
  deliveryArea: "",
  notes: "",

   });

   const [touched, setTouched] = useState({});


   function validateForm(data) {
    const errors = {};

    if(!data.name.trim()){
        errors.name = "please enter your full name.";

    }
    if(!data.phone.trim()){
        errors.phone = "please enter your TeleBirr phone number";

    }else if(!/^09\d{8}$/.test(data.phone.trim())){
        errors.phone = "Enter a valid 10-digit phone number.";
    }
    if(!data.deliveryArea.trim()){
        errors.deliveryArea = "please enter your delivery area.";
    }
    return errors;
   }

   const errors = validateForm(formData);

   function handleChange(event){
    const {name, value} = event.target;

    setFormData((current) => ({
        ...current, [name]:value,
    }));
   }

   function handleBlur(event){
    const {name} = event.target;

    setTouched((current) => ({
      ...current, [name]: true,
    }));
   }

   function handleSubmit(event){
    event.preventDefault();
    setSubmitError("");

    const validationErrors = validateForm(formData);

    setTouched({
        name: true,
        phone: true,
        deliveryArea: true,
        notes: true,
    });

    if(Object.keys(validationErrors).length>0){
        return;
    }
    setSubmitting(true);

    const newOrder = { 
        id: Date.now(), 
        customer: formData, 
        items: cartItems, 
        total: total, 
        status: "Pending", 
        createdAt: new Date().toISOString(), 
    };

try { 
    const savedOrders = localStorage.getItem("addis-eats-orders"); 
    let orders = [];

    if (savedOrders) {
        try {
            const parsedOrders = JSON.parse(savedOrders);
            orders = Array.isArray(parsedOrders) ? parsedOrders : [];
        } catch (error) {
            console.warn("Saved orders were invalid and have been reset.");
        }
    }

    localStorage.setItem( "addis-eats-orders", JSON.stringify([...orders, newOrder]) );
   
   
    console.log("Order submitted:", newOrder);

    clearCart(); 

    navigate("/order-confirmation", { replace: true, });
}catch (error) { 
    console.error("Failed to save order:", error); 
    setSubmitError("We couldn't place your order. Please try again.");

}finally { 
    setSubmitting(false); 
}
 }


    return (

        <section className="min-h-[70vh] bg-background px-6 py-12">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <h1 className="font-serif text-4xl font-bold text-foreground">
                        Checkout

                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Complete your delivery information to place your order.

                    </p>

                </div>
                <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm" 
                >
                    {submitError && (
                        <div
                            role="alert"
                            className="rounded-xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error"
                        >
                            {submitError}
                        </div>
                    )}

                    <div>
                        <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-semibold"
                        > 
                        Full name

                        </label>

                        <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(touched.name && errors.name)}
                        aria-describedby="name.error"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Enter your full name"
                        />
                           { touched.name && errors.name && (
                                <p className="mt-2 text-sm text-error"
                                id="name-error"
                                >
                                   {errors.name}
                                </p>
                            )}              
                    </div>

                    <div>
                        <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-semibold"
                         >TeleBirr phone number

                        </label>
                        <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(touched.phone && errors.phone)}
                        aria-describedby="phone.error"
                        placeholder="Enter your phone"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
                        />
                        {touched.phone && errors.phone && (
                            <p id="phone.error"
                            className="mt-2 text-sm text-error">
                                 {errors.phone}
                            </p>
                        )}
                    </div>
                    <div>
                        <label 
                        htmlFor="deliveryArea"
                        className="mb-2 block text-sm font-semibold"
                        >
                            Delivery area

                        </label>

                        <input
                        id="deliveryArea"
                        name="deliveryArea"
                        type="text"
                        value={formData.deliveryArea}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid = {Boolean(touched.deliveryArea && errors.deliveryArea)}
                        aria-describedby="delivery-area-error"
                        placeholder="e.g Bole, Kazanchis"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
                        />
                        {touched.deliveryArea && errors.deliveryArea && (
                            <p id="delivery-area-error"
                            className="mt-2 text-sm text-error"
                            >
                                {errors.deliveryArea}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="notes"
                        className="mb-2 block text-sm font-semibold"
                        >
                        Special instractions

                        </label>
                        <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows="4"
                        placeholder="Anything we should know?"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    <div className="border-t border-border pt-5">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold">
                                Order total
                            </span>

                            <span className="text-xl font-bold">
                                {total.toLocaleString()}ETB

                            </span>                            
                        </div>
                    </div>

                    <button type="submit"
                    disabled = {submitting || cartItems.length === 0}
                    className="w-full rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                  {submitting ?
                   "processing..." : "place order"}

                    </button>
                </form>

            </div>

        </section>
    );
}

export default Checkout;