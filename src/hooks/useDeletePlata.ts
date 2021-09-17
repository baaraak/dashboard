import { useMutation, useQueryClient } from "react-query";
import api from "services/api";

export function useDeletePlata() {
  const queryClient = useQueryClient();

  return useMutation((id: string) => api.plata.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("platot");
    },
  });
}
