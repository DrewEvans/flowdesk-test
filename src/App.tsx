import React, { useEffect, useState } from 'react';
import { requests } from './api/requests';
import { coins } from './coins';
import { currencies } from './currencies';
import axios from 'axios';
import Table from './components/Table/Table';
import Ticker from './components/Ticker';
import styled from 'styled-components';

const TableContainer = styled.div`
padding: 1em 2em;
width: 80%;
height: 70%;
margin: 2em auto;
overflow: scroll;
background: rgba(107, 0, 210, 0.21);
border-radius: 20px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(7px);
-webkit-backdrop-filter: blur(7px);
border: 1px solid rgba(107, 0, 210, 0.3);
`

const TickerWrapper = styled.div`
position: fixed;
top: 0;
width: 100%;
overflow: hidden;
height: 4rem;
background-color: black; 
padding-left: 100%;
box-sizing: content-box;
`

const TickerWrapper24HR = styled.div`
position: fixed;
bottom: 0;
width: 100%;
overflow: hidden;
height: 4rem;
background-color: black; 
padding-left: 100%;
box-sizing: content-box;
`

const Main = styled.main`
display: flex;
flex-direction: column;
margin: 0;
padding: 0;
color: #fff;
background-color: #000;
height: 100vh;
font-family: "poppins", serif;
`

const Title = styled.h1`
margin: 0;
margin-top: 3%;
`

const SelectContainer = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
width: 350px;
justify-content: space-between;
`
const SelectGroup = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
`

const Select = styled.select`
// background-color: white;
border: none;
padding:  .25em ;
margin: .5em 0;
width: 150px;
font-family: inherit;
font-size: inherit;
font-weight: bold;
cursor: inherit;
line-height: inherit;
`;

const Button = styled.button`
background-color: #fff;
font-size: 1.3em;
color: #1e1e1e;
width: 150px;
height: 40px;
border: 0;
margin: .25em 0;
font-weight: bold;
box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.35);
transition: 0.2s;
`
const FormContainer = styled.form`
display: flex;
flex-direction: column;
`

function App() {
  const { fetchTicker, fetchTicker24hr, fetchTrades } = requests;
  const [baseAsset, setBaseAsset] = useState("BTC");
  const [currencyPair, setCurrencyPair] = useState("EUR");
  const [tradeData, setTradeData] = useState();
  const [tickerData, setTickerData] = useState();
  const [ticker24Data, setTicker24Data] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

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

    if (baseAsset && currencyPair) {

      axios.get(`https://data.binance.com${fetchTrades}?symbol=${baseAsset + currencyPair}`).then((response) => {
        setTradeData(response.data);
      })
      axios.get(`https://data.binance.com${fetchTicker}?symbol=${baseAsset + currencyPair}`).then((response) => {
        setTickerData(response.data);
      })
      axios.get(`https://data.binance.com${fetchTicker24hr}?symbol=${baseAsset + currencyPair}`).then((response) => {
        setTicker24Data(response.data);
      })
    }
  }

  return (
    <Main>
      <Title>Flowdesk Technical Test</Title>
      <FormContainer onSubmit={onSubmit}>
        <SelectContainer>
          <SelectGroup>
            <label>Crypto Currency</label>
            <Select onChange={handleBaseAssetChange}>
              {coins.map((coin, i) => {
                return <option key={`${coin}-${i}`} value={coin}>{coin}</option>
              })}
            </Select>
          </SelectGroup>
          <SelectGroup>
            <label>Fiat Currency</label>
            <Select onChange={handleCurrencyPairChange}>
              {currencies.map((currency, i) => {
                return <option key={`${currency}-${i}`} onChange={(e) => console.log(e)} value={currency}>{currency}</option>
              })}
            </Select>
          </SelectGroup>
        </SelectContainer>
        <Button type='submit'>Submit</Button>
      </FormContainer>
      {tradeData && tickerData ? <>
        {tradeData &&
          <TableContainer>
            <Table data={tradeData} />
          </TableContainer>
        }
        {tickerData && ticker24Data &&
          <>
            <TickerWrapper>
              <Ticker data={tickerData} />
            </TickerWrapper>
            <TickerWrapper24HR>
              <Ticker data={ticker24Data} />
            </TickerWrapper24HR>
          </>
        }</> :
        <h2>Please Select Your trading Pairs</h2>
      }
    </Main>

  );
}

export default App;
