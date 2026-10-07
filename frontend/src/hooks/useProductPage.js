import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";
import { useParams } from "react-router";

function useProductPage() {
  const { slug } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => apiFetch(`/api/products/${slug}`), // return product detail
    enabled: !!slug, // only fetch when slug is available
  });
  return {
    product: data?.product ?? null,
    isLoading,
    error,
  };
}

export default useProductPage;
