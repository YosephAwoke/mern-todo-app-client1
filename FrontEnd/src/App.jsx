import React from 'react';
import TodoList from './components/TodoList';
import './index.css'; // Import the main CSS file

const App = () => {
    return (
        <div className="bg-gray-900 min-h-screen">
            <TodoList />
        </div>
    );
};

export default App;
