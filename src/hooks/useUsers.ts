import { useQuery } from "react-query";
import api from "services/api";

export function useUsers() {
  return useQuery("users", () => api.users.get().then((res) => res.users));
}
