import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../shared/fetch.js";

export function useFetch(key, endpoint) {
  const { isLoading, data, error } = useQuery({
    queryKey: [key],
    queryFn: () => fetchData(endpoint),
  });

  return [isLoading, data, error];
}
