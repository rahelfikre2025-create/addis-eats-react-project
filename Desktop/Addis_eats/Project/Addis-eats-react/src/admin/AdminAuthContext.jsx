
import { createContext, useContext, useMemo, useState } from "react";

const AdminAuthContext = createContext(null);

const ADMIN_EMAIL = "rahel@addiseats.com";
const ADMIN_PASSWORD = "rahel123";

export function AdminAuthProvider({ children }) {
  const [isAdminSignedIn, setIsAdminSignedIn] = useState(() => {
    try {
      return localStorage.getItem("addis-eats-admin") === "true";
    } catch (error) {
      return false;
    }
  });

  function adminSignIn(email, password) {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      try {
        localStorage.setItem("addis-eats-admin", "true");
      } catch (error) {
        // Authentication still works when browser storage is unavailable.
      }
      setIsAdminSignedIn(true);

      return true;
    }

    return false;
  }

  function adminSignOut() {
    try {
      localStorage.removeItem("addis-eats-admin");
    } catch (error) {
      // Continue signing out when browser storage is unavailable.
    }
    setIsAdminSignedIn(false);
  }

  const value = useMemo(
    () => ({
      isAdminSignedIn,
      adminSignIn,
      adminSignOut,
    }),
    [isAdminSignedIn]
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error(
      "useAdminAuth must be used inside AdminAuthProvider"
    );
  }

  return context;
}

