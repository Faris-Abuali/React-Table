import React, { useMemo } from 'react'
import { useTable, useBlockLayout } from "react-table";
import { useSticky } from 'react-table-sticky';
import { COLUMNS, Data, GROUPED_COLUMNS } from "./columns";
import MOCK_DATA from "./MOCK_DATA.json";
import "../styles/Table.css";
import { Styles } from './TableStyles';

type Props = {}

const StickyTable: React.FC<Props> = (props) => {

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);
    /**
     * useMemo will only recompute the memoized value when one of the deps has changed.
     * This optimization helps to avoid expensive calculations on every render.
     * Ensures that data isn't recreated on every render.
     */

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<Data>({
        columns,
        data
    }, useBlockLayout, useSticky);

    const firstPageRows = rows.slice(0, 20);

    return (
        <Styles>
            <div {...getTableProps()} className="table sticky" style={{ width: 1000, height: 500 }}>
                <div className="header">
                    {headerGroups.map((headerGroup) => (
                        <div {...headerGroup.getHeaderGroupProps()} className="tr">
                            {headerGroup.headers.map((column) => (
                                <div {...column.getHeaderProps()} className="th">
                                    {column.render('Header')}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div {...getTableBodyProps()} className="body">
                    {firstPageRows.map((row) => {
                        prepareRow(row);
                        return (
                            <div {...row.getRowProps()} className="tr">
                                {row.cells.map((cell) => (
                                    <div {...cell.getCellProps()} className="td">
                                        {cell.render('Cell')}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Styles>
    )
}

export default StickyTable