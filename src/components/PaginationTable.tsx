import React, { useMemo } from 'react'
import { useTable, usePagination } from "react-table";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import MOCK_DATA from "./MOCK_DATA.json";
import "../styles/Table.css";

type Props = {}

const PaginationTable: React.FC<Props> = (props) => {

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
        // rows, // no longer needed
        page, // instead of rows, we use page
        nextPage, // helper functions
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        prepareRow
    } = useTable<any>({
        columns,
        data: data as any,
        // initialState: { pageIndex: 2 }
    }, usePagination);

    const { pageIndex, pageSize } = state;

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
                        page.map((row: any) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell: any) => (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div>
                <span>
                    Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
                </span>
                <span>
                    {' '} | Go to page: {' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(pageNumber);
                        }}
                        style={{ width: '50px' }}
                    />
                </span>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>&lt;&lt;</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous Page</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>Next Page</button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>&gt;&gt;</button>
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {
                        [10, 25, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))
                    }
                </select>
            </div>
        </main>
    )
}

export default PaginationTable