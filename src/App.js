import { useState } from 'react';

export default function App() {
  const [portfolio, setPortfolio] = useState([
    { name: "위닉스", shares: 2920, avgPrice: 17202, currentPrice: 5850 },
    { name: "삼성전자", shares: 100, avgPrice: 65000, currentPrice: 75000 },
    { name: "TQQQ", shares: 50, avgPrice: 40, currentPrice: 52 }
  ]);

  const totalValue = portfolio.reduce(
    (sum, item) => sum + item.shares * item.currentPrice,
    0
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📊 포트폴리오 회복 시뮬레이터</h1>
      {portfolio.map((stock, idx) => {
        const value = stock.shares * stock.currentPrice;
        const invested = stock.shares * stock.avgPrice;
        const profit = value - invested;
        const rate = (profit / invested) * 100;

        return (
          <div key={idx} style={{ marginBottom: '1rem' }}>
            <h2>{stock.name}</h2>
            <p>보유 수량: {stock.shares}주</p>
            <p>매수 단가: {stock.avgPrice.toLocaleString()}원</p>
            <p>현재가: {stock.currentPrice.toLocaleString()}원</p>
            <p>평가 금액: {value.toLocaleString()}원</p>
            <p>손익: {profit.toLocaleString()}원 ({rate.toFixed(2)}%)</p>
          </div>
        );
      })}
      <h3>총 평가 금액: {totalValue.toLocaleString()}원</h3>
    </div>
  );
}