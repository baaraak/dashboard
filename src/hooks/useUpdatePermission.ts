import { useMutation, useQueryClient } from "react-query";
import api from "services/api";

export function useUpdatePermission() {
  const queryClient = useQueryClient();

  return useMutation((values: any) => api.users.permission(values), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
}
