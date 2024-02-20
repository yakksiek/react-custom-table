import User from './User';

export default interface FetchedUsersData {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}
