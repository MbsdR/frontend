import {IDatapoint} from './IDatapoint';

export interface IScada extends IDatapoint{
  [index: string]: number | string;
}
