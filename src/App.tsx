import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { useEffect, useState } from 'react';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    
  const isLoggedIn = localStorage.getItem('user');
    if(isLoggedIn)
    setIsLoggedIn(true)
   
  }, [])
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;