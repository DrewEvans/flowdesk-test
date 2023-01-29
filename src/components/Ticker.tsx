import React from 'react'

type TickerProps = {
    data: any
    // onChange: (Value: React.ChangeEvent<HTMLSelectElement>) => void
}

const Ticker = ({ data }: TickerProps) => {
    const { closeTime, count, lastPrice, lowPrice, openTime, priceChange } = data


    return (
        <div>
            <ul>
                <li>{closeTime}</li>
                <li>{count}</li>
                <li>{lastPrice}</li>
                <li>{lowPrice}</li>
                <li>{openTime}</li>
                <li>{priceChange}</li>
            </ul>
        </div>
    )
}

export default Ticker