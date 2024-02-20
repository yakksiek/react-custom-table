import * as t from '../models/interfaces';

export const columns: t.HeaderCell[] = [
    {
        title: 'id',
        field: 'id',
        filter: false,
    },
    {
        title: 'Name',
        field: 'firstName',
        filter: false,
    },
    {
        title: 'Surname',
        field: 'lastName',
        filter: false,
    },
    {
        title: 'Age',
        field: 'age',
        filter: true,
    },
    {
        title: 'E-mail',
        field: 'email',
        filter: false,
    },
];
