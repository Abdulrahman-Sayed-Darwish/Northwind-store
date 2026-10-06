import { useAuth } from "@clerk/react";
import PageLoader from "./components/PageLoader";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import { Navigate } from "react-router";
import OrdersPage from "./pages/OrdersPage";
function App() {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <PageLoader />;
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/orders"
          element={isSignedIn ? <OrdersPage /> : <Navigate to={"/"} />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
