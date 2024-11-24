import React, { useEffect, useState } from 'react'


import styles from './index.module.scss';
import useAllUsers from 'hooks/useAllUsers.hook';

import HeaderTurnBackComponent from 'components/header_turn_back/header_turn_back.component';
import InputComponent from '../../../components/inputForm/input.component';
import { Button, Form, InputGroup } from 'react-bootstrap';
import NotificationService from 'services/app/notification.service';
import Swal from 'sweetalert2';

const ManageSurveyUserPage: React.FC = () => {
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
			<HeaderTurnBackComponent title="Mi encuesta" />
			{/* end Titulo */}



		</div>
	)
}


export default ManageSurveyUserPage
