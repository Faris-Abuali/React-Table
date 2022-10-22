import React, { useMemo } from 'react'
import { useTable, useGlobalFilter, useFilters } from "react-table";
import { COLUMNS, Data, GROUPED_COLUMNS } from "./columns";
import MOCK_DATA from "./MOCK_DATA.json";
import "../styles/Table.css";
import GlobalFilter from './GlobalFilter';
import ColumnFilter from './ColumnFilter';

type Props = {}

const FilteringTable: React.FC<Props> = (props) => {

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);
    /**
     * useMemo will only recompute the memoized value when one of the deps has changed.
     * This optimization helps to avoid expensive calculations on every render.
     * Ensures that data isn't recreated on every render.
     */

    // Properties that need to be applied to all columns in the table 👇
    const defaultColumn = useMemo(() => ({ Filter: ColumnFilter }), [])


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable({
        columns,
        data,
        defaultColumn
    }, useFilters);

    const { globalFilter } = (state as any);

    return (
        <main>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map((column: any) => (
                                        <th {...column.getHeaderProps()}>
                                            <>
                                                {column.render('Header')}
                                                <br />
                                                {column.canFilter ? column.render("Filter") : null}
                                            </>
                                        </th>
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

export default FilteringTable