import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Dashboard } from './components/Dashboard';
import { LinkList } from './components/Links';

function App() {
  return (
    <div className="App">
      <Dashboard />
      <LinkList />
    </div>
  );
}

export default App;
