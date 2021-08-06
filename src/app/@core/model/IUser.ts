export interface IUser {
  id: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  token?: string;
}

export class User implements IUser{
  id: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  token?: string;
}
