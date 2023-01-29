import React, { useEffect, useState } from 'react';
import { requests } from './api/requests';
import { coins } from './coins';
import { currencies } from './currencies';
import axios from 'axios';
import Table from './components/Table/Table';
import Ticker from './components/Ticker';



function App() {
  const { fetchTicker, fetchTicker24hr, fetchTrades } = requests;
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [baseAsset, setBaseAsset] = useState("BTC");
  const [currencyPair, setCurrencyPair] = useState("EUR");
  const [tradeData, setTradeData] = useState();
  const [tickerData, setTickerData] = useState();
  const [ticker24Data, setTicker24Data] = useState();


  const handleBaseAssetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setBaseAsset(value)
  }

  const handleCurrencyPairChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCurrencyPair(value);
  }

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setSymbol(baseAsset + currencyPair)

    axios.get(`https://data.binance.com${fetchTrades}?symbol=${symbol}`).then((response) => {
      setTradeData(response.data);
    })
    axios.get(`https://data.binance.com${fetchTicker}?symbol=${symbol}`).then((response) => {
      setTickerData(response.data);
    })
    axios.get(`https://data.binance.com${fetchTicker24hr}?symbol=${symbol}`).then((response) => {
      setTicker24Data(response.data);
    })
  }






  return (
    <div className="App">
      <h1>Flowdesk Technical Test</h1>
      <form onSubmit={onSubmit}>
        <select onChange={handleBaseAssetChange}>
          {coins.map((coin) => {
            return <option value={coin}>{coin}</option>
          })}
        </select>
        <select onChange={handleCurrencyPairChange}>
          {currencies.map((currency) => {
            return <option onChange={(e) => console.log(e)} value={currency}>{currency}</option>
          })}
        </select>
        <button type='submit'>Submit</button>
      </form>
      {tradeData &&
        <Table data={tradeData} />}

      {tickerData && ticker24Data &&
        <>
          <Ticker />
          <Ticker />
        </>
      }
    </div>
  );
}

export default App;
