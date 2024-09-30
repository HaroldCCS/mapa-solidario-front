import React, { useEffect, useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import Swal from 'sweetalert2';
import { Button, Form, InputGroup, Spinner, Table } from 'react-bootstrap';

import { BsPencil } from "react-icons/bs";
import { IoReload } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";

import styles from './index.module.scss';
import useRoles from 'hooks/useRoles.hook';
import useAllUsers from 'hooks/useAllUsers.hook';

import { Interface as InterfaceRole } from 'store/app/rol';
import InterfaceUser from 'store/app/allUsers/allUsers.redux';

import UserCreateComponent from '../../../modules/manageUsers/create/user.create.component';
import HeaderTurnBackComponent from 'components/header_turn_back/header_turn_back.component';
import MapComponent from 'components/map/map.component';

export const ManageHeadquartersPage: React.FC = () => {
	const { roles } = useRoles()
	const { all_users: users, getAll } = useAllUsers()

	const [userData, setUserData] = useState<Partial<InterfaceUser>>({})
	const [rol, setRol] = useState<Partial<InterfaceRole>>({})
	const [show, setShow] = useState<boolean>(false)


	useEffect(() => {
		if (!show) setUserData({})
	}, [show])


	return (
		<div className={styles.main}>
			<MapComponent />
		</div>
	)
}
