import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table';

type GlobalFilterProps = {
    filter: string,
    setFilter: (filter: string) => void
}

const GlobalFilter: React.FC<GlobalFilterProps> = ({ filter, setFilter }) => {
    const [value, setValue] = useState(filter);
    // const onChange = useAsyncDebounce(value => {
    //     setFilter(value || undefined);
    // }, 1000);

    return (
        <span>
            Search: {' '}
            <input
                // value={filter || ''}
                value={value || ''}
                // onChange={e => setFilter(e.target.value)}
                onChange={e => {
                    setFilter(e.target.value);
                    // setValue(e.target.value);
                    // onChange(e.target.value);
                }}
            />
        </span>
    )
}

export default GlobalFilter