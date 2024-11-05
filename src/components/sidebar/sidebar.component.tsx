import React, { memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'resources/routes-constants';

//BOOTSTRAP
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//ICONS
import { PiUserCircle } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";

import { IoIosNotificationsOutline } from "react-icons/io";
import { TbLogout } from "react-icons/tb";

import styles from './index.module.scss';
import { Fade } from 'react-awesome-reveal';
import usePermissions from 'hooks/usePermissions.hook';
import { PERMISSIONS } from 'resources/permissions-constants';
import useToken from 'hooks/useToken.hook';
import { FaRegMap } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';

function SidebarComponent() {
  const location = '/' + useLocation()?.pathname?.split('/')[1];
  const { logout } = useToken()
  const { hasPermission } = usePermissions()


  return (
    <div className={styles.sidebar}>
      <Fade>
        {true && <RedirectComponent page_route={ROUTES.HOMEPAGE_ROUTE} currentPath={location}> <IoHomeOutline /> <p>Menu</p>  </RedirectComponent>} {/* TODO PONER PERMISO */}
        {hasPermission(PERMISSIONS.MANAGE_USERS) && <RedirectComponent page_route={ROUTES.MANAGE_USERS} currentPath={location}> <PiUserCircle /> <p>Usuarios</p>  </RedirectComponent>}
        {hasPermission(PERMISSIONS.MANAGE_HEADQUARTERS) && <RedirectComponent page_route={ROUTES.MANAGE_HEADQUARTERS} currentPath={location}> <FaRegMap /> <p>Centros de ayuda</p>  </RedirectComponent>}
        {hasPermission(PERMISSIONS.MANAGE_EVENTS) && <RedirectComponent page_route={ROUTES.MANAGE_EVENTS} currentPath={location}> <FiCalendar /> <p>Eventos</p>  </RedirectComponent>}
        
        {hasPermission(PERMISSIONS.SHOW_HEADQUARTERS) && <RedirectComponent page_route={ROUTES.SHOW_HEADQUARTERS} currentPath={location}> <FaRegMap /> <p>Centros de ayuda</p>  </RedirectComponent>}
        {hasPermission(PERMISSIONS.SHOW_EVENTS) && <RedirectComponent page_route={ROUTES.SHOW_EVENTS} currentPath={location}> <FiCalendar /> <p>Eventos</p>  </RedirectComponent>}
        {hasPermission(PERMISSIONS.MY_NOTIFICATIONS) && <RedirectComponent page_route={ROUTES.MY_NOTIFICATIONS} currentPath={location}> <IoIosNotificationsOutline /> <p><small>Alertas</small> </p>  </RedirectComponent>}
        <div className={styles.logout}>
          <RedirectComponent callback={logout} currentPath={location}> <TbLogout /> <p>Salir</p> </RedirectComponent>
        </div>
      </Fade>
    </div>
  );
}

function RedirectComponent(
  { page_route, children, currentPath, callback }: { readonly page_route?: string, readonly children: React.ReactNode, readonly currentPath: string, callback?: any }) {
  const isActive = currentPath === page_route;

  return (
    <Link onClick={() => callback ? callback() : null} to={page_route || ''} className={`${styles.link} ${isActive ? styles.active : ''}`}>
      <Fade>{children}</Fade>
    </Link>
  );
}

export default memo(SidebarComponent);
