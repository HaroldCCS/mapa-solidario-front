import React, { useEffect, useState } from 'react'


import styles from './index.module.scss';
import useAllUsers from 'hooks/useAllUsers.hook';

import HeaderTurnBackComponent from 'components/header_turn_back/header_turn_back.component';
import InputComponent from '../../../components/inputForm/input.component';
import { Button, Form, InputGroup } from 'react-bootstrap';
import NotificationService from 'services/app/notification.service';
import Swal from 'sweetalert2';

const CreateNotificationPage: React.FC = () => {
	const { all_users: users, getAll, updateUserValidation } = useAllUsers()

	const [newNotification, setNewNotification] = useState<{ name: string, description: string, users: string[] }>({ name: '', description: '', users: [] })

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setNewNotification({ ...newNotification, [e.target.name]: value });
	};
	const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.checked;

		setNewNotification((prev) => {
			const new_users = [...prev.users]
			if (value) {
				new_users.push(e.target.name)
			} else {
				new_users.splice(new_users.indexOf(e.target.name), 1)
			}

			return { ...prev, users: new_users }
		})
	};

	const createNotification = async () => {
		const notification = new NotificationService();
		const data = await notification.createMany(newNotification)
		if (data?.success) {
			setNewNotification({ name: '', description: '', users: [] })
			Swal.fire({
				icon: 'success',
				title: 'Notificación enviada',
				text: 'La notificación se ha enviado correctamente',
			});
		}
	}

	const validateAllProperties = () => {
		if (!newNotification?.name || !newNotification?.description || !newNotification?.users?.length) return true
		return false
	}

	return (
		<div className={styles.main}>

			{/* start Titulo */}
			<HeaderTurnBackComponent title="Crea una notificación masiva" />
			{/* end Titulo */}


			<div className='d-flex align-items-center justify-content-center mb-4'>
				<Button onClick={createNotification} disabled={validateAllProperties()} size="lg">
					Enviar Notificatión
				</Button>
			</div>

			<InputComponent className='mb-2' required label="Titulo de la notificaión" setHandle={handleChange} name="name" value={newNotification?.name} type="string" version="group" />
			<InputGroup className='mb-2'>
				<InputGroup.Text>Contenido de la notificación</InputGroup.Text>
				<Form.Control as="textarea"
					name={'description'}
					value={newNotification?.description}
					onChange={e => handleChange(e as any)}
				/>
			</InputGroup>

			<InputGroup.Text>Agrega los usuarios que recibiran esta notificaión</InputGroup.Text>
			<InputGroup className="mb-3 d-flex">
				{users?.map(user => {
					return (
						<InputGroup key={user?._id} className="mb-1">
							<InputGroup.Checkbox aria-label="Checkbox for following text input" name={user?._id} checked={newNotification?.users?.some(_e => _e == user?._id)} onChange={(e) => handleChangeCheckbox(e)} />
							<Form.Control aria-label="Text input with checkbox" disabled={true} value={user?.email} />
						</InputGroup>
					)
				})}


			</InputGroup>

		</div>
	)
}


export default CreateNotificationPage
