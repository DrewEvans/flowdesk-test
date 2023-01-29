import React, { useState, useEffect } from 'react'
import { sortArray } from '../../helpers/sortArray'
import "./table.css"

type TableProps = {
    data: any
    // onChange: (Value: React.ChangeEvent<HTMLSelectElement>) => void
}

const Table = ({ data, }: TableProps) => {

    let moment = require("moment")
    const [sortedData, setSortedData] = React.useState<any>()
    const [sortBy, setSortBy] = React.useState<string>("time");

    useEffect(() => {
        setSortedData(sortArray(sortBy, data, "desc"))
    }, [sortBy, data])


    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // const value = event.target.value
        setSortBy(event.target.value);
    }


    console.log(sortedData)

    return (
        <>
            <div>
                <select onChange={handleChange}>
                    <option value="time">Time</option>
                    <option value="price">Price</option>
                    <option value="qty">Quantity</option>
                    <option value="quoteQty">Quote Quantity</option>
                </select>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Quote Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData &&
                        sortedData.map((rows: any) => {
                            const { time, price, quoteQty, qty } = rows

                            console.log()

                            return (
                                <tr>
                                    <td>{moment(time).format("DD/MM/YYYY")}</td>
                                    <td>{moment(time).format("LTS")}</td>
                                    <td>{parseFloat(price)}</td>
                                    <td>{qty}</td>
                                    <td>{parseFloat(quoteQty).toFixed(2)}</td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </>
    )
}

export default Table