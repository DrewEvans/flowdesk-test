type requests = {[key: string] : string  }

export const requests : requests = {
    fetchTicker : '/api/v3/ticker',
    fetchTicker24hr : '/api/v3/ticker/24hr',
    fetchExchange : '/api/v3/exchangeInfo',
    fetchTrades: '/api/v3/trades'
}