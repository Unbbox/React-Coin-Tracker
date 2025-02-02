import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [urMoney, setUrMoney] = useState(0);
  const [keyword, setKeyword] = useState("");
  const calcCoin = (e) => {
    setUrMoney(e.target.value);
  };
  const SearchCoin = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
      });
  }, []);

  // Show Coin Price Table
  const CryptoTable = () => {
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Price (USD)</th>
              <th>You Can Buy (Coin)</th>
            </tr>
          </thead>

          <tbody>
            {coins.map((coin) =>
              coin.name.toLowerCase().includes(keyword) || coin.symbol.toLowerCase().includes(keyword) ? (
                <tr key={coin.id}>
                  <td>
                    {coin.name}({coin.symbol})
                  </td>
                  <td>$ {coin.quotes.USD.price.toFixed(2)}</td>
                  <td>
                    {(urMoney / coin.quotes.USD.price).toFixed(8)} {coin.symbol}
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Coin Exchange Calculator ({coins.length})</h1>
      {loading ? <strong>Loading...</strong> : null}
      <div className="calcContainer">
        <label htmlFor="">USD</label>
        <input type="number" name="" id="" placeholder="Write Your USD" value={urMoney} onChange={calcCoin} />
        <br />
        <label htmlFor="">Coin name</label>
        <input type="text" name="" id="" placeholder="Write you want to find" onChange={SearchCoin} style={{ color: "white" }} />
      </div>
      <br />
      <hr /> <br />
      <CryptoTable />
    </div>
  );
}

export default App;
