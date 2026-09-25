import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import Menu from "./pages/Menu";
import DishDetail from "./pages/DishDetail";
import NotFound from "./pages/NotFound";
import RequireAuth from "./auth/RequireAuth";
import SignIn from "./pages/SignIn";
import OrderConfirm from "./pages/OrderConfirm";
import OrderHistory from "./pages/OrderHistory";
import Favorites from "./pages/Favorites";
import ErrorBoundary from "./components/ErrorBoundary";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminMenu from "./admin/AdminMenu";
import AdminOrders from "./admin/AdminOrder";
import AdminLogin from "./admin/AdminLogin";
import RequireAdmin from "./admin/RequireAdmin";

function App(){
  return(
 <Routes>
  <Route path = "/" element = {<Layout />}>
    <Route index element = {<Home />} />
    <Route path="menu" element={
      <ErrorBoundary>
        <Menu/>
      </ErrorBoundary>}/>
    <Route path="menu/:id" element={<DishDetail/>}/>
    <Route path="cart" element={
      <ErrorBoundary>
        <Cart/>
      </ErrorBoundary>}/>
    <Route path="checkout" 
      element={
        <RequireAuth>
          <Checkout/>
        </RequireAuth>}
    />
    <Route path="signin" element={<SignIn/>}/>
    <Route path="favorites" element={<Favorites/>}/>
    <Route
      path="orders"
      element={
        <RequireAuth>
          <OrderHistory />
        </RequireAuth>
      }
    />
    <Route path="order-confirmation" element={<OrderConfirm />}/>
    <Route path="order-confirm" element={<OrderConfirm />}/>
    <Route path="*" element={<NotFound />}/>
  </Route>
  <Route path="/admin/login" element={<AdminLogin />} />
  <Route path="/admin" element={
    <RequireAdmin>
    <AdminLayout/>
    </RequireAdmin>}>
    <Route index element={<AdminDashboard/>}/>
     <Route path="menu" element={<AdminMenu/>}/>
    <Route path="orders" element={<AdminOrders/>}/>
  </Route>
 </Routes>

  );
}

export default App;

