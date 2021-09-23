import { useMutation, useQueryClient } from "react-query";
import api from "services/api";
import { NewPlataType } from "pages/plata/add-plata-form";

export function useAddPlata() {
  const queryClient = useQueryClient();

  return useMutation((newPlata: NewPlataType) => api.plata.add(newPlata), {
    onSuccess: () => {
      queryClient.invalidateQueries("platot");
    },
  });
}
