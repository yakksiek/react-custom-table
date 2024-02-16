import React from 'react';
import styled from 'styled-components';

import * as t from '../../models/interfaces';

const StyledTableCell = styled.td`
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
`;

interface ContentProps {
    entries: t.User[];
    columns: t.HeaderCell[];
}

function Content({ entries, columns }: ContentProps) {
    const renderContent = (entries: t.User[]) => {
        return (
            <tbody>
                {entries.map(item => {
                    return (
                        <tr key={item.id}>
                            {columns.map(column => {
                                const { field } = column;
                                return <StyledTableCell key={field}>{item[field as keyof t.User]}</StyledTableCell>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        );
    };

    return <>{renderContent(entries)}</>;
}

export default Content;
