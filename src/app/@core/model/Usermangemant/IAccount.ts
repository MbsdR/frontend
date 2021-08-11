export interface IAccount {
  personal?: IPersonal;
  company?: ICompany;
  department?: string;
}

export interface ICompany {
  abbr: string;
  company?: string;
}

export interface IPersonal {
  surname: string;
  name: string;
}

