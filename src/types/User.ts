import { Permissions } from './Permissions';

export type User = {
  username: string;
  permissions: Permissions[];
  _id: string;
  createdAt: string;
  updatedAt: string;
};
