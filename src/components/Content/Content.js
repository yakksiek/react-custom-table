import React from 'react';
import styled from 'styled-components';

const StyledTableCell = styled.td`
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
`;

function Content({ entries, columns }) {
    return (
        <tbody>
            {entries.map(item => {
                return (
                    <tr key={item.id}>
                        {columns.map(column => {
                            return <StyledTableCell key={column}>{item[column]}</StyledTableCell>;
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
}

export default Content;
