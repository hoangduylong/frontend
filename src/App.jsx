import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './pages/login/Login';
import Homepage from './pages/homepage/Homepage';
import Register from './pages/register/Register';
import NotFound from './pages/not-found/NotFound';
import Profile from './pages/profile/Profile';

const App = () => {
  const token = useSelector((state) => {
    return state.user ? state.user.token : '';
  });

  return (
    <Router>
      <Routes>
        {token ? (
          ''
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Homepage />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
