import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/header';
import Footer from './Components/footer';
import Home from './Pages/Home';
import AddTransaction from './Pages/AddTransaction';
import TransactionList from './Pages/TransactionList';
import Reports from './Pages/Reports';
import Settings from './Pages/Settings'
import "./../src/App.css"

function App() {
  return (
    <Router>
      <div className="main-container" >
        {/* The Header is visible on all pages */}
        <Header />
        {/* The Routes */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddTransaction />} />
            <Route path="/list" element={<TransactionList />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
        {/* The Footer is visible on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
