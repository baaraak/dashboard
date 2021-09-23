import { useMutation, useQueryClient } from "react-query";
import api from "services/api";

export function useDeletePlata() {
  const queryClient = useQueryClient();

  return useMutation((_id: string) => api.plata.delete({ _id }), {
    onSuccess: () => {
      queryClient.invalidateQueries("platot");
    },
  });
}
