import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import History from '../pages/History/History';
import Dashboard from '../pages/Dashboard/Dashboard';
import Home from '../pages/Home/Home';

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
