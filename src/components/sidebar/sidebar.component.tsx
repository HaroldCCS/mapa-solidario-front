import React, { memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'resources/routes-constants';

//BOOTSTRAP
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//ICONS
import { PiUsersThree, PiUserCircle, PiBeerSteinLight } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { TiScissorsOutline } from "react-icons/ti";

import { RiBeerLine } from "react-icons/ri";
import { BsBook } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbLogout } from "react-icons/tb";

import styles from './index.module.scss';
import { Fade } from 'react-awesome-reveal';
import usePermissions from 'hooks/usePermissions.hook';
import { PERMISSIONS } from 'resources/permissions-constants';
import useToken from 'hooks/useToken.hook';

function SidebarComponent() {
  const location = '/' + useLocation()?.pathname?.split('/')[1];
  const { logout } = useToken()
  const { hasPermission } = usePermissions()


  return (
    <div className={styles.sidebar}>
      <Fade>
        {true && <RedirectComponent page_route={ROUTES.HOMEPAGE_ROUTE} currentPath={location}> <IoHomeOutline /> <p>Menu</p>  </RedirectComponent>} {/* TODO PONER PERMISO */}
        {hasPermission(PERMISSIONS.CLIENT_MY_RESERVATIONS) && <RedirectComponent page_route={ROUTES.MY_RESERVATIONS_ROUTE} currentPath={location}> <IoMdNotificationsOutline /><p>Mis reservas</p></RedirectComponent>}
        {hasPermission(PERMISSIONS.MANAGE_USERS) && <RedirectComponent page_route={ROUTES.MANAGE_USERS} currentPath={location}> <PiUserCircle /> <p>Usuarios</p>  </RedirectComponent>}
        {hasPermission(PERMISSIONS.MANAGE_USERS) && <RedirectComponent page_route={ROUTES.MANAGE_CLIENTS} currentPath={location}> <PiUsersThree /> <p>Clientes</p>  </RedirectComponent>}
        {hasPermission(PERMISSIONS.MANAGE_RESERVATIONS) && <RedirectComponent page_route={ROUTES.MANAGE_RESERVATIONS} currentPath={location}> <TiScissorsOutline /> <p>Reservas</p> </RedirectComponent>}
        {hasPermission(PERMISSIONS.MANAGE_SERVICES) && <RedirectComponent page_route={ROUTES.MANAGE_SERVICES} currentPath={location}> <BsBook /> <p>Servicios</p>  </RedirectComponent>} {/* TODO PONER PERMISO */}
        {hasPermission(PERMISSIONS.MANAGE_PRODUCTS) && <RedirectComponent page_route={ROUTES.MANAGE_PRODUCTS} currentPath={location}> <PiBeerSteinLight /> <p>Productos</p> </RedirectComponent>}
        
        {/* {true && <RedirectComponent place_redirect="Gestionar sedes" page_route={ROUTES.MANAGE_HEADQUARTERS} currentPath={location}> <HiOutlineBuildingStorefront /> </RedirectComponent>} */}
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
