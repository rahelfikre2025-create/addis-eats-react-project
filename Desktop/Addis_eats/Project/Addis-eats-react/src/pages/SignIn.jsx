import { useState } from "react";
import { Link, useLocation, useNavigate, } from "react-router-dom";

import { useAuth } from "../auth/AuthContext";

function signIn(){
    const [name, setName] = useState("");
    const {signIn} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
     

    function handleSubmit(event){
        event.preventDefault();

        if(!name.trim()){
            return;
        }

        signIn(name.trim());
       
        navigate(from, {
            replace: true,
        });
    }

    return (
        <section className="min-h-[70vh] bg-background px-6 py-16">
            <div className="mx-auto flex max-w-md flex-col items-center">
             <div className="mb-8 text-center">
                <div className="mb-4 text-5xl">
                   🍲
                </div>
                <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">
                    Welcome to Addis Eats

                </h1>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                   Sign in to continue with your order.
                </p>
             </div>

             <div className="w-full rounded-2xl border border-border bg-card p-7 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
               
               <div>
                <label 
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-foreground" >
                   Your name
                </label>

                <input id="name" 
                name="name" 
                type="text" 
                value={name} 
                onChange={(event) => setName(event.target.value)} 
                placeholder="Enter your name" 
                autoComplete="name" 
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" 
                />
               </div>

               <button 
               type="submit" 
               className="w-full rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 active:scale-[0.99]" 
               > 
                Sign In
                </button>

                <div className="mt-6 border-t border-border pt-5 text-center">
                    <Link to="/menu" 
                         className="text-sm font-medium text-muted-foreground transition hover:text-accent"
                    > ← Back to Menu 
                    </Link>
                </div>

                <p className="mt-6 text-center text-xs leading-5 text-muted-foreground"> 
                    Sign in is required before completing your order.
                </p>
            </form>
             </div>
            </div>
        </section>
    );
}

export default signIn;