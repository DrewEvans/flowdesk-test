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
`

type TickerProps = {
    data: any
    // onChange: (Value: React.ChangeEvent<HTMLSelectElement>) => void
}

const Ticker = ({ data }: TickerProps) => {
    useEffect(() => { console.log("Refreshed") }, [data])

    const entries = getObjectEntries(data);

    function getObjectEntries<T>(obj: Object): Array<[keyof T, T[keyof T]]> {
        return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
    }

    return (

        <TickerContainer>
            {entries.map(([key, value]) => (
                <TickerItem key={key}>
                    {key}: {typeof value === "string" ? parseFloat(value).toFixed(2) : value}
                </TickerItem>
            ))}
        </TickerContainer>

    )
}

export default Ticker