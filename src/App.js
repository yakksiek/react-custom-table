import UserTable from './components/UsersTable';
import './App.css';

function App() {
    return (
        <div className='App'>
            <h1 style={{ marginBottom: '1rem' }}>Users</h1>
            <UserTable />
        </div>
    );
}

export default App;
