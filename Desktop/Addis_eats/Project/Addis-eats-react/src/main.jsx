import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./cart/CartContext";
import { AuthProvider } from "./auth/AuthContext";
import { AdminAuthProvider } from "./admin/AdminAuthContext";
import { FavoritesProvider } from "./favorites/FavoritesContext";
import { ThemeProvider } from "./theme/ThemeContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AdminAuthProvider>
          <AuthProvider>
            <FavoritesProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </FavoritesProvider>
          </AuthProvider>
        </AdminAuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);

