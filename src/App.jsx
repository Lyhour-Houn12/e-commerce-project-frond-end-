import Product from "./pages/Product.jsx";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./ui/Navbar.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import { Toaster } from "react-hot-toast";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import PrivateRoute from "./ui/PrivateRoute.jsx";
import Signup from "./pages/Signup.jsx";
import Checkout from "./pages/Checkout.jsx";
import PaymentConfirmation from "./components/payment/PaymentConfirmation.jsx";
import AdminLayout from "./pages/AdminLayout.jsx";
import Dashboad from "./components/admin/dashboard/Dashboad.jsx";
import AdminProduct from "./components/admin/products/AdminProduct.jsx";
import Category from "./components/admin/categories/Category.jsx";
import Seller from "./components/admin/sellers/Seller.jsx";
import Orders from "./components/admin/orders/Orders.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirm" element={<PaymentConfirmation />} />

          <Route path="/" element={<PrivateRoute publicPage />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </Route>

          <Route path="/" element={<PrivateRoute adminOnly />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboad />} />
              <Route path="products" element={<AdminProduct />} />
              <Route path="orders" element={<Orders />} />
              <Route path="categories" element={<Category />} />
              <Route path="sellers" element={<Seller />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#374151",
            color: "white",
          },
        }}
      />
    </>
  );
};

export default App;
