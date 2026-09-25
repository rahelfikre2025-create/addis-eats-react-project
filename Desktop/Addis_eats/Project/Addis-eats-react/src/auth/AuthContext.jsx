import { createContext, useContext, useEffect, useMemo, useState, } from "react";

const AuthContext = createContext(null);

export function AuthProvider({children}){
    const [user, setUser] = useState(() =>{
      try {
        const savedUser = localStorage.getItem("addis-eats-user");

        return savedUser ? JSON.parse(savedUser) : null;
      }catch(error){
        return null;
      }
    });

    useEffect(() => {
        if(user){
            localStorage.setItem("addis-eats-user", JSON.stringify(user));

        } else {
            localStorage.removeItem("addis-eats-user");
        }
    }, [user]);

    function signIn(name) {
        setUser({
            name,
        });
    }
    function signOut(){
        setUser(null);
    }

    const value = useMemo( () => ({
        user,
        isSignedIn: Boolean(user),
        signIn,
        signOut,
    }), [user]
);

return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
);
}
 
export function useAuth(){
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("useAuth must be used inside AuthProvider");

    }
    return context;
}