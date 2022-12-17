import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import routes from './routes/routes';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

const App = () => {
  const store = localStorage.getItem('store');

  return (
    <Router>
      <Routes>
        {store ? (
          routes.map((route) => (
            <Route path={route.path} element={route.element} />
          ))
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
