import * as accountRepo from '../../account/repo';
import { add as addBalance, remove as removeBalance } from '../../balance/repo';
import type { Param } from '../types';
import type {
  Add,
  AddBalance,
  Get,
  Remove,
  RemoveBalance,
  Update,
} from './types';

async function accountHandler({ operation, arg }: Omit<Param, 'entity'>) {
  switch (operation) {
    case 'getall': {
      const accounts = await accountRepo.getAll();
      return accounts;
    }

    case 'get': {
      const account = await accountRepo.get(arg as Get['arg']);
      return account;
    }

    case 'add':
      await accountRepo.add(arg as Add['arg']);
      return;

    case 'add-balance':
      await addBalance(...(arg as AddBalance['arg']));
      return;

    case 'remove-balance':
      await removeBalance(arg as RemoveBalance['arg']);
      return;

    case 'remove':
      await accountRepo.remove(arg as Remove['arg']);
      return;

    case 'update': {
      const account = await accountRepo.get((arg as Update['arg']).id);
      account.name = (arg as Update['arg']).name;
      await accountRepo.save(account);
      return;
    }

    default:
      break;
  }
}

export default accountHandler;
