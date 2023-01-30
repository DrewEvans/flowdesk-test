import React, { useState, useEffect } from 'react'
import { sortArray } from '../../helpers/sortArray'
import styled from 'styled-components';
import "./table.css"

const Select = styled.select`
background-color: white;
border: none;
padding: .5em .25em ;
margin: .5em 0;
width: 25%;
font-family: inherit;
font-size: inherit;
font-weight: bold;
color: #6b00d2;
cursor: inherit;
line-height: inherit;
`;

const TableTitleDisplay = styled.div`
display: flex;
flex-direction: column;
position: sticky;
top: -16px; 
background-color: #6b00d2;
border-radius: 10px 10px 0  0;
padding 0  .5em ; 

@media only screen and (max-width: 760px),
  (min-device-width: 760px) and (max-device-width: 1023px) {
    position: relative;
    top: 0;
  }
`

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
        setSortBy(event.target.value);
    }

    return (
        <>
            <TableTitleDisplay>
                <h2>Recent Trades</h2>
                <label>Sort By </label>
                <Select onChange={handleChange}>
                    <option value="time">Time</option>
                    <option value="price">Price</option>
                    <option value="qty">Quantity</option>
                    <option value="quoteQty">Quote Quantity</option>
                </Select>
            </TableTitleDisplay>

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

                            return (
                                <tr className='row-data'>
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