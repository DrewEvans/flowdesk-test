import React from 'react'
import { Moment } from 'moment'
import "./table.css"

type TableProps = {
    data: any,
}

const Table = ({ data }: TableProps) => {

    let moment = require("moment")

    console.log(data)
    return (
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
                            <td>{moment(time).format("SS:MM:HH")}</td>
                            <td>{parseFloat(price)}</td>
                            <td>{parseFloat(quoteQty).toFixed(0)}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table