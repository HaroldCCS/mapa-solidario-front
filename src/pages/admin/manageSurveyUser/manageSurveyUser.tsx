import React, { useEffect, useState } from 'react'


import styles from './index.module.scss';

import HeaderTurnBackComponent from 'components/header_turn_back/header_turn_back.component';
import InputComponent from '../../../components/inputForm/input.component';
import useSurveyUser from 'hooks/useSurveyUser.hook';
import useSurveyProperties from 'hooks/useSurveyProperties.hook';
import { Fade } from 'react-awesome-reveal';
import { Button } from 'react-bootstrap';
import { BsSave } from 'react-icons/bs';
import { Interface } from 'store/app/survey-user';
import LoaderGoogleComponent from '../../../components/loaders/loaderV2/loaderGoogle.component';

const ManageSurveyUserPage: React.FC = () => {
	const { survey_user, saveMany, isLoadingos } = useSurveyUser();
	const { survey_properties } = useSurveyProperties({});

	const [newData, setNewData] = useState<{ [propertie_id: string]: any }>({});
	const [canSave, setCanSave] = useState<boolean>(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const propertie_id = e.target.name;
		setNewData({ ...newData, [propertie_id]: value });
	};

	const save = async () => {
		const data: Interface[] = Object.keys(newData).map(key => ({ propertie: key, value: newData[key] }))
		await saveMany(data)
		setNewData({})
	}

	useEffect(() => {
		setCanSave(!!Object.keys(newData).length)
	}, [newData])

	return (
		<div className={styles.main}>

			{/* start Titulo */}
			<HeaderTurnBackComponent title="Mi encuesta" />
			{/* end Titulo */}


			<div className='d-flex justify-content-center flex-wrap mb-5'>
				<Fade>
					<Button variant="outline-primary" size='lg' onClick={save} disabled={!canSave}>
						Guardar <BsSave />
					</Button>
				</Fade>
			</div>

			<div className='d-flex justify-content-center flex-wrap mb-5'>

				{isLoadingos && <LoaderGoogleComponent />}
				{!isLoadingos && survey_properties?.map(item => (
					<InputComponent
						key={item?._id || ''}
						required
						label={item?.propertie || ''}
						setHandle={handleChange}
						name={item?._id || ''}
						value={newData[item?._id || ''] || survey_user?.find(_i => _i?.propertie === item?._id)?.value}
						type={item?.type_form || 'text'}
						version="group"
					/>
				))}

			</div>

		</div>
	)
}


export default ManageSurveyUserPage
