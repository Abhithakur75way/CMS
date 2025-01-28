import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Navbar from './components/Navbar';
import AdminSidebar from './components/AdminSidebar.tsx';
import AdminDashboard from './pages/admin/DashBoard';
import FormBuilder from './pages/admin/FormBuilder';
import StaticContent from './pages/admin/Staticcontent.tsx';
import Home from './components/HomePage';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import Login from './pages/auth/LoginPage';
import Register from './pages/auth/RegisterPage';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <DndProvider backend={HTML5Backend}> {/* Wrap the entire Router with DndProvider */}
     <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes - Only accessible if user role is 'admin' */}
          {user?.role === 'admin' && (
            <>
              <Route path="/admin/dashboard" element={<><AdminSidebar /><AdminDashboard /></>} />
              <Route path="/admin/form-builder" element={<><AdminSidebar /><FormBuilder /></>} />
              <Route path="/admin/static-content" element={<><AdminSidebar /><StaticContent /></>} />
            </>
          )}

          {/* User Routes - For normal users */}
          {user?.role === 'user' && (
            <Route path="/user/content" element={<StaticContent />} />
          )}
        </Routes>
      </Router>
    </DndProvider> 
  );
};

export default App;
