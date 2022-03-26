import Account from '../account/Account';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export default class Balance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column('timestamp')
  date: Date;

  @ManyToOne(() => Account, (account) => account.balances, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  account: Account;
}
