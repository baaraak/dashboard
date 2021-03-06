import { useState } from "react";
import { Stack, useToast, Heading, Center } from "@chakra-ui/react";

import Skeletons from "components/skeletons";
import { useUsers } from "hooks/user/useUsers";
import { User } from "types/User";
import ConfirmDialog from "components/confirm-dialog";
import UserRow from "./user-row";
import AddUser from "./add-user";
import { useDeleteUser } from "hooks/user/useDeleteUser";
import { useUpdatePermission } from "hooks/user/useUpdatePermission";

export type AddPlataValues = {
  name: string;
  price: string;
  parent?: string;
};
export default function Users() {
  const { data, isLoading } = useUsers();
  const [collapsedUser, setCollapsedUser] = useState<string>();

  const [confirmUserDelete, setConfirmUserDelete] = useState<string>();

  const { mutateAsync: deleteMutation, isLoading: isDeleteMutationLoading } =
    useDeleteUser();
  const { mutateAsync: updatePermissions, isLoading: isPermissionsLoading } =
    useUpdatePermission();
  const toast = useToast();

  const onDelete = async () => {
    if (!confirmUserDelete) return;
    try {
      await deleteMutation(confirmUserDelete);
      toast({ status: "success", description: "משתמש נמחק בהצלחה" });
    } catch (e) {
      toast({ status: "error", description: "אופס, משהו השתבש" });
    }
    setConfirmUserDelete("");
  };

  const handlePermissionsChange = async (
    userId: string,
    permissionId: string,
  ) => {
    try {
      await updatePermissions({ userId, permissionKey: permissionId });
      toast({ status: "success", description: "הרשאה עודכנה בהצלחה" });
    } catch (e) {
      toast({ status: "error", description: "אופס, משהו השתבש" });
    }
    setConfirmUserDelete("");
  };

  return (
    <>
      <Heading size="lg" fontWeight="regular">
        ניהול משתמשים
      </Heading>
      <Center>
        <Stack spacing={4} w="100%">
          <AddUser />

          {isLoading ? (
            <>
              <Skeletons length={4} height={16} />
            </>
          ) : (
            data.map((user: User) => (
              <UserRow
                {...user}
                key={user._id}
                collapsedUser={collapsedUser}
                setCollapsedUser={setCollapsedUser}
                setConfirmUserDelete={setConfirmUserDelete}
                onPermissions={handlePermissionsChange}
                isPermissionsLoading={isPermissionsLoading}
              />
            ))
          )}
        </Stack>
      </Center>
      <ConfirmDialog
        children="למחוק את המשתמש?"
        onClose={() => setConfirmUserDelete("")}
        onDelete={onDelete}
        isOpen={!!confirmUserDelete}
        isLoading={isDeleteMutationLoading}
      />
    </>
  );
}
