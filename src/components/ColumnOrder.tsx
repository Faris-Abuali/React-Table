import React, { useMemo } from 'react'
import { useTable, useColumnOrder } from "react-table";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import MOCK_DATA from "./MOCK_DATA.json";
import "../styles/Table.css";

type Props = {}

const ColumnOrder: React.FC<Props> = (props) => {

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);
    /**
     * useMemo will only recompute the memoized value when one of the deps has changed.
     * This optimization helps to avoid expensive calculations on every render.
     * Ensures that data isn't recreated on every render.
     */

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        setColumnOrder
    } = useTable({
        columns,
        data: data as any
    }, useColumnOrder);

    const changeOrder = () => {
        setColumnOrder(['id', 'first_name', 'last_name', 'phone', 'country', 'date_of_birth']);
    }
    return (
        <main>
            <button
                onClick={() => setColumnOrder(['id', 'first_name', 'last_name', 'date_of_birth', 'country', 'phone'])}>
                Reset Order
            </button>
            <button onClick={changeOrder}>
                Change order
            </button>
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    {footerGroups.map((footerGroup) => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {
                                footerGroup.headers.map((column) => (
                                    <td {...column.getFooterProps()}>
                                        {column.render('Footer')}
                                    </td>))
                            }
                        </tr>
                    ))}
                </tfoot>
            </table>
        </main>
    )
}

export default ColumnOrder