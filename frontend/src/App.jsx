import { useAuth } from "@clerk/react";
import PageLoader from "./components/PageLoader";
import Layout from "./components/Layout";
function App() {
  const { isLoaded } = useAuth();
  if (!isLoaded) return <PageLoader />;
  return (
    <Layout>
      <header>
        <button className="btn bg-gray-100 text-black">Click me</button>
      </header>
    </Layout>
  );
}

export default App;
