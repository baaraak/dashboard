import { Permissions } from "./Permissions";

export type User = {
  username: string;
  permissions: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
};
