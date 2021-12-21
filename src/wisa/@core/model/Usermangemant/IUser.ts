import {IProfile} from './IProfile';

export interface IUser {
  id: string;
  username: string;
  password: string;
  profile: IProfile;
  firstName?: string;
  lastName?: string;
  token?: string;
}

export class User implements IUser{
  id: string;
  username: string;
  password: string;
  profile: IProfile;
  firstName?: string;
  lastName?: string;
  token?: string;
}
