import { useMutation, useQueryClient } from 'react-query';
import { AddPlataValues } from '../pages/plata/Plata';
import api from '../services/api';

export function useAddPlata() {
  const queryClient = useQueryClient();

  return useMutation((newPlata: AddPlataValues) => api.plata.add(newPlata), {
    onSuccess: () => {
      queryClient.invalidateQueries('platot');
    },
  });
}
