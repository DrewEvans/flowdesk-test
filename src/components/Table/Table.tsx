import React, { useState } from 'react'
import "./table.css"

type TableProps = {
    data: any
    // onChange: (Value: React.ChangeEvent<HTMLSelectElement>) => void
}

const Table = ({ data, }: TableProps) => {

    let moment = require("moment")

    const [sortBy, setSortBy] = React.useState<string | undefined>();


    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // const value = event.target.value
        setSortBy(event.target.value);
    }

    console.log(sortBy)

    return (
        <>
            <div>
                <select onChange={handleChange}>
                    <option value="time">Time</option>
                    <option value="price">Price</option>
                    <option value="quanity">Quantity</option>
                </select>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((rows: any) => {
                        const { time, price, quoteQty } = rows

                        console.log()

                        return (
                            <tr>
                                <td>{moment(time).format("DD/MM/YYYY")}</td>
                                <td>{moment(time).format("LTS")}</td>
                                <td>{parseFloat(price)}</td>
                                <td>{parseFloat(quoteQty).toFixed(0)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Table