import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

//PAGES

import { ROUTES } from './resources/routes-constants'

//Layouts
import AnonymousLayout from 'layouts/anonymous/anonymous.layout'
import StaffLayout from './layouts/staff/staff.layout'

import { NotFoundPage, LoginPage, HomePage } from './pages'
import PrivateRoute from './components/auth/auth';
import PrivateLoginRoute from './components/auth/login';
import ManageUsersPage from 'pages/admin/manageUsers/manageUsers.page'

const RootComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={ROUTES.PRINCIPAL_PAGE_ROUTE} replace />} />

                {/* Rutas protegidas */}
                <Route element={<PrivateRoute />}>
                    <Route path="*" element={<StaffLayout><NotFoundPage /></StaffLayout>} />
                    <Route path={ROUTES.HOMEPAGE_ROUTE} element={<StaffLayout><HomePage /></StaffLayout>} />
                    <Route path={ROUTES.MANAGE_USERS} element={<StaffLayout><ManageUsersPage /></StaffLayout>} />
                </Route>

                {/* Ruta de inicio de sesión */}
                <Route element={<PrivateLoginRoute />}>
                    <Route path={ROUTES.LOGIN} element={<AnonymousLayout><LoginPage /></AnonymousLayout>} />
                    <Route path="*" element={<AnonymousLayout><NotFoundPage /></AnonymousLayout>} />
                </Route>

            </Routes>
        </Router>
    );
};

export default RootComponent
