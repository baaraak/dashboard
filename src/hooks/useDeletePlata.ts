import { useMutation, useQueryClient } from 'react-query';
import { DeletePlataValues } from '../pages/plata/Plata';
import api from '../services/api';

export function useDeletePlata() {
  const queryClient = useQueryClient();

  return useMutation((values: DeletePlataValues) => api.plata.delete(values), {
    onSuccess: () => {
      queryClient.invalidateQueries('platot');
    },
  });
}
