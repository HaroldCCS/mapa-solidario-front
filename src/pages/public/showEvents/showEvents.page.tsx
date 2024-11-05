import React, { useEffect, useState } from 'react'
import styles from './index.module.scss';
import useEvents from 'hooks/useEvents.hook';

import InterfaceEvent from 'store/app/event/event.redux';

import { useAppDispatch } from 'store';
import EventService from 'services/app/event.service';
import ListMapComponent from '../../../components/listMap/listMap.component';
import { Spinner, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const ShowEventsPage: React.FC = () => {
	const { events, getAllEvents } = useEvents()

	const [eventData, setEventData] = useState<Partial<InterfaceEvent>>({})

	return (
		<div className={styles.main}>
			<div className={styles.list}>
				<h1>Lista de eventos</h1>
				{events?.length ? <Table striped hover borderless>
					<thead>
						<tr>
							<th>titulo</th>
							<th>ubicación</th>
							<th>Fecha</th>
							<th>estado</th>
						</tr>
					</thead>
					<tbody>
						{events?.map(r => (<tr key={r?._id} className={r?._id === eventData?._id ? styles.active : ''} onClick={() => setEventData(r)}>
							<td>{r.title}</td>
							<td>{r.ubication}</td>
							<td>{r?.day && new Date(r?.day)?.toLocaleString()}</td>
							<td>{r.status ? 'Activo' : 'Inactivo'}</td>

						</tr>))}
					</tbody>
				</Table>
					: <Spinner animation="grow" />
				}

				{/* <Button variant="primary" onClick={() => setEventData({})}> Ver todos los eventos</Button> */}
			</div>
			<div className={styles.map}><ListMapComponent events={events} setEventData={setEventData} eventSelected={eventData as any} /></div>
		</div>
	)
}


export default ShowEventsPage
