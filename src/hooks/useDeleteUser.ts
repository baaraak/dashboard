import { useMutation, useQueryClient } from "react-query";
import { DeletePlataValues } from "pages/plata/Plata";
import api from "services/api";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation((id: string) => api.users.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
}
