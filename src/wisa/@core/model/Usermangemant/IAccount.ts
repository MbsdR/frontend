import {IProfile} from './IProfile';

export interface IAccount {
  profile: IProfile;
  personal?: IPersonal;
  company: ICompany;
  department?: string;
}

export class Account implements IAccount{
  profile: IProfile;
  company: ICompany;
  department: string;
  personal: IPersonal;

  constructor(profile: IProfile) {
    this.profile = profile;
  }
}

export interface ICompany {
  abbr: string;
  company?: string;
}

export class Company implements ICompany{
  abbr: string;
  company: string;

  constructor(abbr: string) {
    this.abbr = abbr;
  }
}

export interface IPersonal {
  surname: string;
  name: string;
}

