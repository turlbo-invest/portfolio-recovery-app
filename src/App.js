import { useEffect, useState } from "react";

export default function App() {
  const [portfolio, setPortfolio] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    shares: "",
    avgPrice: "",
    currentPrice: ""
  });
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio");
    if (saved) {
      setPortfolio(JSON.parse(saved));
    } else {
      setPortfolio([
        { name: "위닉스", shares: 2920, avgPrice: 17202, currentPrice: 5850 },
        { name: "삼성전자", shares: 100, avgPrice: 65000, currentPrice: 75000 },
        { name: "TQQQ", shares: 50, avgPrice: 40, currentPrice: 52 }
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  const handleAdd = () => {
    const entry = {
      name: newItem.name,
      shares: parseInt(newItem.shares),
      avgPrice: parseFloat(newItem.avgPrice),
      currentPrice: parseFloat(newItem.currentPrice)
    };

    if (editingIndex >= 0) {
      const updated = [...portfolio];
      updated[editingIndex] = entry;
      setPortfolio(updated);
      setEditingIndex(-1);
    } else {
      setPortfolio([...portfolio, entry]);
    }

    setNewItem({ name: "", shares: "", avgPrice: "", currentPrice: "" });
  };

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleDelete = (idx) => {
    const confirmDelete = window.confirm("정말 이 종목을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    const updated = [...portfolio];
    updated.splice(idx, 1);
    setPortfolio(updated);
  };

  const handleEdit = (idx) => {
    const item = portfolio[idx];
    setNewItem({
      name: item.name,
      shares: item.shares,
      avgPrice: item.avgPrice,
      currentPrice: item.currentPrice
    });
    setEditingIndex(idx);
  };

  const totalValue = portfolio.reduce(
    (sum, item) => sum + item.shares * item.currentPrice,
    0
  );

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>📊 포트폴리오 회복 시뮬레이터</h1>

      <div
        style={{
          marginBottom: "1rem",
          border: "1px solid #ddd",
          padding: "1rem"
        }}
      >
        <h2>{editingIndex >= 0 ? "종목 수정" : "종목 추가"}</h2>
        <input
          name="name"
          placeholder="종목명"
          value={newItem.name}
          onChange={handleChange}
        />
        <input
          name="shares"
          placeholder="보유 수량"
          value={newItem.shares}
          onChange={handleChange}
        />
        <input
          name="avgPrice"
          placeholder="매수 단가"
          value={newItem.avgPrice}
          onChange={handleChange}
        />
        <input
          name="currentPrice"
          placeholder="현재가"
          value={newItem.currentPrice}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>{editingIndex >= 0 ? "✅ 수정" : "➕ 추가"}</button>
      </div>

      {portfolio.map((stock, idx) => {
        const value = stock.shares * stock.currentPrice;
        const invested = stock.shares * stock.avgPrice;
        const profit = value - invested;
        const rate = (profit / invested) * 100;

        return (
          <div
            key={idx}
            style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc" }}
          >
            <h2>{stock.name}</h2>
            <p>보유 수량: {stock.shares}주</p>
            <p>매수 단가: {stock.avgPrice.toLocaleString()}원</p>
            <p>현재가: {stock.currentPrice.toLocaleString()}원</p>
            <p>평가 금액: {value.toLocaleString()}원</p>
            <p>
              손익: {profit.toLocaleString()}원 ({rate.toFixed(2)}%)
            </p>
            <button onClick={() => handleEdit(idx)}>✏️ 수정</button>
            <button onClick={() => handleDelete(idx)}>🗑 삭제</button>
          </div>
        );
      })}

      <h3>총 평가 금액: {totalValue.toLocaleString()}원</h3>
    </div>
  );
}
