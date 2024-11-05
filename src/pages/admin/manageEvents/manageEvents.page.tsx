import React, { useEffect, useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import Swal from 'sweetalert2';
import { Button, Form, InputGroup, Modal, Spinner, Table } from 'react-bootstrap';

import { BsPencil } from "react-icons/bs";
import { IoReload } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { GrValidate } from "react-icons/gr";

import styles from './index.module.scss';
import useEvents from 'hooks/useEvents.hook';

import InterfaceEvent from 'store/app/event/event.redux';

import HeaderTurnBackComponent from 'components/header_turn_back/header_turn_back.component';
import EventCreateComponent from 'modules/manageEvents/create/event.create.component';
import { useAppDispatch } from 'store';
import EventService from 'services/app/event.service';
import eventAction from 'store/app/event/event.action';

const ManageEventsPage: React.FC = () => {
	const { events, getAllEvents } = useEvents()
  const eventService = new EventService();

	const [eventData, setEventData] = useState<Partial<InterfaceEvent>>({})
	const [show, setShow] = useState<boolean>(false)
  const dispatch = useAppDispatch();


	useEffect(() => {
		if (!show) setEventData({})
	}, [show])


	const handleChangeStatus = async (data: InterfaceEvent) => {
		const response = await eventService.edit({...data, status: !data.status});
		if (response?._id) {
			dispatch(eventAction.update(response));
		}
	}

	return (
		<div className={styles.main}>

			{/* start Titulo */}
			<HeaderTurnBackComponent title="Gestiona los eventos" />
			{/* end Titulo */}


			{/* start Acciones crear ingresar */}
			<div className='d-flex justify-content-between flex-wrap mb-5'>
				<Fade>
					<Button variant="outline-primary" onClick={getAllEvents}>
						Recargar eventos <IoReload />
					</Button>
				</Fade>

				<Fade>
					<EventCreateComponent setShow={setShow} show={show} eventData={eventData} />
				</Fade>

			</div>
			{/* end Acciones crear ingresar */}


			<Fade>
				{events?.length ? <Table striped hover borderless>
					<thead>
						<tr>
							<th>titulo</th>
							<th>ubicación</th>
							<th>Fecha</th>
							<th>estado</th>
							<th style={{ width: '100px' }} >acciones</th>
						</tr>
					</thead>
					<tbody>
						{events?.map(r => (<tr key={r?._id}>
							<td>{r.title}</td>
							<td>{r.ubication}</td>
							<td>{r?.day && new Date(r?.day)?.toLocaleString()}</td>
							<td>{r.status ? 'Activo' : 'Inactivo'}</td>
							<td className='d-flex justify-content-center'>
							<Form.Check className="d-flex align-items-center m-2" inline type="switch" id="status" checked={r?.status} name="status" onChange={e => handleChangeStatus(r)} />

							<BsPencil style={{ cursor: 'pointer' }} title='Editar' onClick={() => { setEventData(r); setShow(true) }} />
							</td>
						</tr>))}
					</tbody>
				</Table>
					: <Spinner animation="grow" />
				}

			</Fade>
		</div>
	)
}


export default ManageEventsPage
