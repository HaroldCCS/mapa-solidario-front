import React, { useEffect, useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import Swal from 'sweetalert2';
import { Button, Form, InputGroup, Modal, Spinner, Table } from 'react-bootstrap';

import { BsPencil } from "react-icons/bs";
import { IoReload } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { GrValidate } from "react-icons/gr";

import styles from './index.module.scss';

import { Interface as InterfaceRole } from 'store/app/rol';

import HeaderTurnBackComponent from 'components/header_turn_back/header_turn_back.component';
import useNotifications from 'hooks/useNotifications.hook';
import { Interface } from 'store/app/notification';
import LoaderGoogleComponent from '../../../components/loaders/loaderV2/loaderGoogle.component';

const ManageNotificationsPage: React.FC = () => {
	const { notifications, getAllNotifications, isLoadingNotificationos } = useNotifications()
	



	return (
		<div className={styles.main}>

			{/* start Titulo */}
			<HeaderTurnBackComponent title="Gestiona las notificaciones" />
			{/* end Titulo */}


			{/* start Acciones crear ingresar */}
			<div className='d-flex justify-content-between flex-wrap mb-5'>
				<Fade>
					<Button variant="outline-primary" onClick={getAllNotifications}>
						Recargar notificaciones <IoReload />
					</Button>
				</Fade>

			</div>
			{/* end Acciones crear ingresar */}


			{/* start listar los hogares del usuario */}
			<Fade>
				
				{isLoadingNotificationos ? <LoaderGoogleComponent /> : notifications?.length ? <Table striped hover borderless>
					<thead>
						<tr>
							<th>Titulo</th>
							<th>Descripción</th>
						</tr>
					</thead>
					<tbody>
						{notifications?.map(r => (<tr key={r?._id}>
							<td>{r.name}</td>
							<td>{r.description}</td>
						</tr>))}
					</tbody>
				</Table>
					: <h3>No hay notificaciones</h3>
				}

			</Fade>

		</div>
	)
}

export default ManageNotificationsPage
