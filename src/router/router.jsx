import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../views/Home/Home';
import Layout from '../layout/Layout';
import History from '../views/History/History';
import Dashboard from '../views/Dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/history', element: <History /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]);

export default router;
