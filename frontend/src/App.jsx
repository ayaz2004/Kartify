import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
// import Contact from './pages/Contact';
import Profile from './pages/Profile';
import FamilyDashboard from './pages/FamilyDashboard';
import ShoppingLists from './pages/ShoppingLists';
import Inventory from './pages/Inventory';
import Products from './pages/Products';

import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/contact" element={<Contact />} /> */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/family" element={<FamilyDashboard />} />
              <Route path="/shopping-lists" element={<ShoppingLists />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
