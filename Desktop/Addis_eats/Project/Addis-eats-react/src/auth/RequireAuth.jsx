import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

function RequireAuth({children}){
    const {isSignedIn} = useAuth();
    const location = useLocation();

    if(!isSignedIn){
        return (
            <Navigate 
             to= "/signin"
             state={{from: location}}
             replace
            />
        );
    }
    return children;
}
export default RequireAuth;