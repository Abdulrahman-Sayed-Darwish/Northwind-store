import { useAuth } from "@clerk/react";
import PageLoader from "./components/PageLoader";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import { Navigate } from "react-router";
import OrdersPage from "./pages/OrdersPage";
import CheckoutReturnPage from "./pages/CheckoutReturnPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { SentryDemoPage } from "./pages/SentryDemoPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import OrderChatPage from "./pages/OrderChatPage";
import OrderVideoPage from "./pages/OrderVideoPage";
import AdminProductsPage from "./pages/AdminProductsPage";
function App() {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <PageLoader />;
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route
          path="/orders"
          element={isSignedIn ? <OrdersPage /> : <Navigate to={"/"} />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout/return" element={<CheckoutReturnPage />} />
        <Route path="/demo-sentry" element={<SentryDemoPage />} />
        <Route
          path="/orders/:id/call"
          element={isSignedIn ? <OrderVideoPage /> : <Navigate to={"/"} />}
          replace
        />
        //
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={isSignedIn ? <AdminProductsPage /> : <Navigate to={"/"} />}
        />
        <Route path="*" element={<div>404 Not Found</div>} />
        {/* Nested Routes */}
        <Route path="/orders/:id" element={<OrderDetailPage />}>
          <Route index element={<OrderSummaryPage />} />
          <Route path="chat" element={<OrderChatPage />} /> //orders/:id/chat
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
