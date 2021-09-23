import { useQuery } from "react-query";
import api from "services/api";

export function usePlatot() {
  return useQuery("platot", () => api.plata.get().then((res) => res.platot));
}
