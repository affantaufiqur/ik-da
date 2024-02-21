import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../shared/fetch.js";
import { useEffect } from "react";

/**
 * @param {string} key
 * @param {string} endpoint
 * @param {RequestInfo} options
 */
export function useFetch(key, endpoint, options = {}) {
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: [key],
    queryFn: () => fetchData(endpoint, options),
  });

  useEffect(() => {
    // Manually trigger data fetching when the endpoint or key changes
    refetch();
  }, [endpoint, key, refetch]);

  return [isLoading, data, error, refetch];
}
