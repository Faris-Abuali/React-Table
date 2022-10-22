import React, { useMemo } from 'react'
import { useTable, useSortBy, HeaderGroup } from "react-table";
import { COLUMNS, GROUPED_COLUMNS, Data } from "./columns";
import MOCK_DATA from "./MOCK_DATA.json";
import "../styles/Table.css";

type Props = {}

const SortingTable: React.FC<Props> = (props) => {

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
    } = useTable<Data>(
        {
            columns,
            data: data as Data[]
        },
        useSortBy
    )


    useMemo(() => {
        console.log({ headerGroups });
    }, []);

    return (
        <main>
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column: any) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {console.log(column.getSortByToggleProps())}
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </th>
                                ))}
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

export default SortingTable