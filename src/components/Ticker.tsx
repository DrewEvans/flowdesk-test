import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const tickerAnimation = keyframes`
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      visibility: visible;
    }
  
    100% {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  }
`

const TickerContainer = styled.div`
    display: inline-block;
    height: 4rem;
    line-height: 4rem;  
    white-space: nowrap;
    padding-right: 100%;
    box-sizing: content-box;

    animation-name: ${tickerAnimation};
    animation-duration: 70s;
    animation-iteration-count: infinite;
`

const TickerItem = styled.div`   
display: inline-block;
padding: 0 2rem;
font-size: 1.5rem;
color: white;
text-transform: capitalize;
`

type TickerProps = {
    data: any
    // onChange: (Value: React.ChangeEvent<HTMLSelectElement>) => void
}

interface TickerData {
    key: string;
    value: any;
}

const Ticker = ({ data }: TickerProps) => {
    useEffect(() => { console.log("Refreshed") }, [data])

    const entries: TickerData[] = Object.entries(data).map(([key, value]) => ({ key, value }));

    return (
        <TickerContainer>
            {entries.map(({ key, value }) => (
                <TickerItem key={key + data.firstId}>
                    {key.replace(/([A-Z])/g, ' $1')}: {value}
                </TickerItem>
            ))}
        </TickerContainer>
    )
}

export default Ticker