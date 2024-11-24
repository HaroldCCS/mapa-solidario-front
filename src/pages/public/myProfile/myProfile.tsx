import React, { useEffect, useState } from 'react'

import styles from './index.module.scss';
import useRoles from 'hooks/useRoles.hook';

import InterfaceUser from 'store/app/allUsers/allUsers.redux';

import HeaderTurnBackComponent from 'components/header_turn_back/header_turn_back.component';
import useUser from 'hooks/useUser.hook';
import { Table } from 'react-bootstrap';
import UserCreateComponent from 'modules/manageUsers/create/user.create.component';

const MyProfilePage: React.FC = () => {
	const { roles } = useRoles()
	const { user } = useUser()

	const [userData, setUserData] = useState<Partial<InterfaceUser>>({})
	const [show, setShow] = useState<boolean>(false)

	useEffect(() => {
		setUserData({...user, password: ''})
	}, [user])



	return (
		<div className={styles.main}>

			{/* start Titulo */}
			<HeaderTurnBackComponent title="Mis Datos" />
			{/* end Titulo */}
			<UserCreateComponent setShow={setShow} show={show} userData={userData} hideCreate={true} hideFields={{ status: true, rol: true }} blockFields={{ email: true }} />



			{/* start listar los hogares del usuario */}
			<div className='d-flex flex-wrap mb-5'>

				<Table striped bordered hover onClick={() => setShow(true)} className='w-100'>
					<thead>
						<tr>
							<th>Datos</th>
							<th>Valor</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td>Nombre</td>
							<td>{user?.name || '-----'}</td>
						</tr>
						<tr>
							<td>Correo</td>
							<td>{user?.email || '-----'}</td>
						</tr>
						<tr>
							<td>Celular</td>
							<td>{user?.cell_phone || '-----'}</td>
						</tr>
						<tr>
							<td>NIT</td>
							<td>{user?.nit || '-----'}</td>
						</tr>
						<tr>
							<td>Dirección</td>
							<td>{user?.address || '-----'}</td>
						</tr>
						<tr>
							<td>Rol</td>
							<td>{roles.find(rol => rol._id === user?.rol)?.name || '-----'}</td>
						</tr>
					</tbody>
				</Table>
			</div>

			{/* end listar los hogares del usuario */}
		</div>
	)
}


export default MyProfilePage
