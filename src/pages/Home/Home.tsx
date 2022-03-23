import { Container, Table } from "reactstrap";
import Alert from "react-bootstrap/Alert";
import displayInYen from "../../core/displayInYen";
import { useSelector } from "react-redux";
import format from "date-fns/format";
import type { Account } from "../../core/redux/types";

const TODAY = new Date();

type MonthlyBalance = Record<string, number>;

type hej = {
  id: Account["id"];
  name: Account["name"];
  balance: Record<string, number>;
};

const Home = () => {
  const accounts = useSelector((x) => x.accounts.accounts);

  let totalBalance = 0;
  const totalBalancePerMonth: MonthlyBalance = {};

  const tja: hej[] = accounts.map((x) => {
    totalBalance += x.currentBalance;

    const balancePerMonth: MonthlyBalance = {};
    const expensesPerMonth: MonthlyBalance = {};

    x.balances.forEach((y) => {
      const month = format(new Date(y.date), "yyyyMM");
      let balance = balancePerMonth[month] || 0;
      balance += y.amount;
      balancePerMonth[month] = balance;

      let tbpm = totalBalancePerMonth[month] || 0;
      tbpm += y.amount;
      totalBalancePerMonth[month] = tbpm;

      if (y.amount < 0) {
        let expenses = expensesPerMonth[month] || 0;
        expenses += y.amount;
        expensesPerMonth[month] = expenses;
      }
    });

    return {
      id: x.id,
      name: x.name,
      balance: balancePerMonth,
    };
  });

  return (
    <Container style={{ marginTop: 10 }}>
      <Alert color={totalBalance > 0 ? "success" : "danger"}>
        Total: {displayInYen(totalBalance)}
      </Alert>

      <h2>Balances</h2>
      <Table bordered>
        <thead>
          <tr>
            <th style={{ width: 5 }}>#</th>
            <th style={{ width: 5 }}>Account</th>
            {Array.from(Array(6)).map((_, i) => {
              const date = new Date();
              date.setMonth(TODAY.getMonth() - i);
              return (
                <th key={i} style={{ width: 100 }}>
                  {date.getFullYear()}-{date.getMonth() + 1}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tja.map((x) => {
            return (
              <tr key={x.name}>
                <td>{x.id}</td>
                <td>{x.name}</td>
                {Array.from(Array(6)).map((_, i) => {
                  const date = new Date();
                  date.setMonth(TODAY.getMonth() - i);
                  const month = format(date, "yyyyMM");
                  const b = x.balance[month] || 0;
                  return (
                    <td key={i}>{b > 0 || b < 0 ? displayInYen(b) : ""}</td>
                  );
                })}
              </tr>
            );
          })}
          <tr>
            <td></td>
            <td>
              <b>Total</b>
            </td>
            {Array.from(Array(6)).map((_, i) => {
              const date = new Date();
              date.setMonth(TODAY.getMonth() - i);
              const month = format(date, "yyyyMM");
              const b = totalBalancePerMonth[month] || 0;
              return (
                <td key={i}>
                  <b>{b > 0 || b < 0 ? displayInYen(b) : ""}</b>
                </td>
              );
            })}
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
