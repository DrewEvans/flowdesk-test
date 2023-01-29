import React from 'react'

type TickerProps = {
    data: any
    // onChange: (Value: React.ChangeEvent<HTMLSelectElement>) => void
}

const Ticker = ({ data }: TickerProps) => {
    const entries = getObjectEntries(data);

    function getObjectEntries<T>(obj: Object): Array<[keyof T, T[keyof T]]> {
        return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
    }

    return (
        <div>
            <ul>
                {entries.map(([key, value]) => (
                    <li key={key}>
                        {key}: {value}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Ticker