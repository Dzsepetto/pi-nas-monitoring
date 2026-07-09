import { createBrowserRouter, Navigate } from 'react-router-dom'

import AppLayout from '../layout/AppLayout'
import ProtectedRoute from './ProtectedRoute'

import LoginPage from '../pages/LoginPage'
import ServicesPage from '../pages/ServicesPage'
import StoragePage from '../pages/StoragePage'
import NotFoundPage from '../pages/NotFoundPage'
import DashboardPage from '../pages/DashboardPage'
import StorageDetailPage from '../pages/StorageDetailPage'
import SettingsPage from '../pages/SettingsPage'

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
            element: <Navigate to="/dashboard" replace />
          },
          {
            path: '/dashboard',
            element: <DashboardPage />
          },
          {
            path: '/services',
            element: <ServicesPage />
          },
          {
            path: '/storage',
            element: <StoragePage />
          },
                    {
            path: '/storage/:uuid',
            element: <StorageDetailPage />
          },
          {
            path: '/settings',
            element: <SettingsPage />
          },
        ]
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
])