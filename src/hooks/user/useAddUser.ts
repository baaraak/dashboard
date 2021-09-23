import { useMutation, useQueryClient } from "react-query";
import { NewUserType } from "pages/users/add-user";
import api from "services/api";

export function useAddUser() {
  const queryClient = useQueryClient();

  return useMutation((user: NewUserType) => api.users.add(user), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
}
