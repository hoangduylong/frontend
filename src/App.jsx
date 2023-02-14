import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import styled from 'styled-components'

import routes from './routes/routes';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import TaskPieChart from './pages/chart/TaskPieChart';

const AppStyled = styled.div`
  width: 100vw;
  overflow: hidden;
`

const App = () => {
  const store = localStorage.getItem('store');

  return (
    <AppStyled>
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
            <Route path="/chart" element={<TaskPieChart />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </Router>
    </AppStyled>
  );
};

export default App;
