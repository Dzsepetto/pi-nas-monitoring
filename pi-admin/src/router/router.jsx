import { createBrowserRouter, Navigate } from 'react-router-dom'

import AppLayout from '../layout/AppLayout'
import ProtectedRoute from './ProtectedRoute'

import LoginPage from '../pages/LoginPage'
import ServicesPage from '../pages/ServicesPage'
import StoragePage from '../pages/StoragePage'
import NotFoundPage from '../pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/',
            element: <Navigate to="/services" replace />
          },
          {
            path: '/services',
            element: <ServicesPage />
          },
          {
            path: '/storage',
            element: <StoragePage />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
])