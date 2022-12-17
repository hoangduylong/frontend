import { Navigate } from 'react-router-dom';

import Register from '../pages/register/Register';
import Homepage from '../pages/homepage/Homepage';
import Profile from '../pages/profile/Profile';
import AddTask from '../pages/tasks/add-task/AddTask';
import TaskDetail from '../pages/tasks/task-detail/TaskDetail';
import Layout from '../layouts/main-layout/Layout';
import NotFound from '../pages/not-found/NotFound';

const routes = [
  {
    path: '/login',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/profile',
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
  {
    path: '/',
    element: (
      <Layout>
        <Homepage />
      </Layout>
    ),
  },
  {
    path: '/tasks/add',
    element: (
      <Layout>
        <AddTask />
      </Layout>
    ),
  },
  {
    path: '/tasks/:id',
    element: (
      <Layout>
        <TaskDetail />
      </Layout>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
