import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

//PAGES

import { ROUTES } from './resources/routes-constants'

//Layouts
import AnonymousLayout from 'layouts/anonymous/anonymous.layout'
import StaffLayout from './layouts/staff/staff.layout'
import MapLayout from 'layouts/map/map.layout'


import PrivateRoute from './components/auth/auth';
import PrivateLoginRoute from './components/auth/login';

import { NotFoundPage, LoginPage, HomePage } from './pages'
import ManageUsersPage from 'pages/admin/manageUsers/manageUsers.page'
import { ManageHeadquartersPage } from 'pages/admin/manageHeadquarters/manageHeadquarters.page'
import ManageNotificationsPage from 'pages/admin/manageNotifications/manageNotifications.page'
import ManageEventsPage from 'pages/admin/manageEvents/manageEvents.page'
import ShowEventsPage from 'pages/public/showEvents/showEvents.page'
import MyProfilePage from 'pages/public/myProfile/myProfile'
import CreateNotificationPage from 'pages/admin/createNotifications/createNotification'

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
                    <Route path={ROUTES.CREATE_NOTIFICATIONS} element={<StaffLayout><CreateNotificationPage /></StaffLayout>} />

                    <Route path={ROUTES.MY_PROFILE} element={<StaffLayout><MyProfilePage /></StaffLayout>} />
                    <Route path={ROUTES.MANAGE_EVENTS} element={<StaffLayout><ManageEventsPage /></StaffLayout>} />
                    <Route path={ROUTES.MANAGE_HEADQUARTERS} element={<MapLayout><ManageHeadquartersPage /></MapLayout>} />

                    <Route path={ROUTES.MY_NOTIFICATIONS} element={<StaffLayout><ManageNotificationsPage /></StaffLayout>} />
                    <Route path={ROUTES.SHOW_EVENTS} element={<MapLayout><ShowEventsPage /></MapLayout>} />
                    <Route path={ROUTES.SHOW_HEADQUARTERS} element={<StaffLayout><ManageHeadquartersPage /></StaffLayout>} />
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
