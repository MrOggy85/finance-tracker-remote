import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import Account from './account/Account';
import Balance from './balance/Balance';
import { Currency, CurrencyValue } from './currency/Currency';

const HOST = process.env.DB_HOST;
const DATABASE = process.env.DB_NAME;
const PORT = Number(process.env.DB_PORT);
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;

let connection: Connection;

async function getConnection() {
  if (connection) {
    return connection;
  }
  connection = await createConnection({
    type: 'postgres',
    database: DATABASE,
    host: HOST,
    username: USER,
    password: PASSWORD,
    port: PORT,

    synchronize: true,
    entities: [Account, Balance, Currency, CurrencyValue],
  });

  return connection;
}

export default getConnection;
