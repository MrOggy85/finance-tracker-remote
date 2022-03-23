import * as accountRepo from "../../account/repo";
import * as balanceRepo from "../../balance/repo";

export type GetAll = {
  entity: 'account';
  operation: 'getall';
  arg?: never;
};

export type Get = {
  entity: 'account';
  operation: 'get';
  arg: Parameters<typeof accountRepo['get']>[0];
};

export type Add = {
  entity: 'account';
  operation: 'add';
  arg: Parameters<typeof accountRepo['add']>[0];
};

export type AddBalance = {
  entity: 'account';
  operation: 'add-balance';
  arg: Parameters<typeof balanceRepo.add>;
};

export type RemoveBalance = {
  entity: 'account';
  operation: 'remove-balance';
  arg: Parameters<typeof balanceRepo.remove>[0];
};

export type Remove = {
  entity: 'account';
  operation: 'remove';
  arg: Parameters<typeof accountRepo['remove']>[0];
};

export type Update = {
  entity: 'account';
  operation: 'update';
  arg: {
    id: Parameters<typeof accountRepo['get']>[0];
    name: Parameters<typeof accountRepo['add']>[0];
  }
};

type Account = GetAll | Get | Add | AddBalance | RemoveBalance | Remove | Update;
export default Account;
