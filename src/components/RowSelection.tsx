import React, { useMemo } from 'react'
import { useTable, useRowSelect } from "react-table";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import MOCK_DATA from "./MOCK_DATA.json";
import "../styles/Table.css";
import Checkbox from "./CheckBox";

type Props = {}

const RowSelection: React.FC<Props> = (props) => {

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
        selectedFlatRows,
    } = useTable({
        columns,
        data,
    },
        useRowSelect,
        (hooks) => {
            // This function gets all the table hooks as an argument.
            // We can use this to add our own custom hooks.
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }) => (
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        )
                    },
                    ...columns
                ]
            });
        });

    const firstPageRows = rows.slice(0, 10);

    return (
        <main>
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
                        firstPageRows.map((row) => {
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
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            selectedFlatRows: selectedFlatRows.map((row) => row.original)
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
        </main>
    )
}

export default RowSelection