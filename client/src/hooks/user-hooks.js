import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../shared/token.js";

/**
 * @param {string} key
 * @param {string} endpoint
 * @param {RequestInfo} options
 */
export function useFetchUser() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["fetchUser"],
    queryFn: async () => await getCurrentUser(),
    staleTime: 30,
  });

  return [isLoading, data, error];
}
