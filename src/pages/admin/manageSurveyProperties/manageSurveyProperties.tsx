import React, { useEffect, useState } from 'react'


import styles from './index.module.scss';
import HeaderTurnBackComponent from 'components/header_turn_back/header_turn_back.component';
import SurveyPropertieCreateComponent from 'modules/manageSurveyProperties/create/survey-propertie.create.component';
import { Interface } from 'store/app/survey-propertie';
import { Fade } from 'react-awesome-reveal';
import useSurveyProperties from 'hooks/useSurveyProperties.hook';
import { Button, Spinner, Table } from 'react-bootstrap';
import { BsDash, BsPencil } from 'react-icons/bs';
import { FiDelete } from 'react-icons/fi';
import { IoReload } from 'react-icons/io5';

const ManageSurveyPropertiesPage: React.FC = () => {
	const {survey_properties, remove, getAll } = useSurveyProperties({});
	const [show, setShow] = useState<boolean>(false)
	const [currentData, setCurrentData] = useState<Partial<Interface>>({})

	return (
		<div className={styles.main}>

			{/* start Titulo */}
			<HeaderTurnBackComponent title="Gestiona las preguntas de la encuesta" />
			{/* end Titulo */}


			<div className='d-flex justify-content-between flex-wrap mb-5'>
				<Fade>
					<SurveyPropertieCreateComponent setShow={setShow} show={show} currentData={currentData} />
				</Fade>

				<Fade>
					<Button variant="outline-primary" onClick={getAll}>
						Recargar usuarios <IoReload />
					</Button>
				</Fade>
			</div>


			<Fade>
				{survey_properties?.length ? <Table striped hover borderless>
					<thead>
						<tr>
							<th>Campo</th>
							<th>tipo de dato</th>
							<th style={{ width: '100px' }} >acciones</th>
						</tr>
					</thead>
					<tbody>
						{survey_properties.map(r => (<tr key={r?._id}>
							<td>{r.propertie}</td>
							<td>{r.type_form}</td>
							<td>
								<div className='d-flex justify-content-center gap-3'>
									<BsPencil style={{ cursor: 'pointer' }} title='Editar' onClick={() => { setCurrentData(r); setShow(true) }} />
									<FiDelete style={{ cursor: 'pointer' }} title='Eliminar' onClick={() => remove(r?._id as string)} />

								</div>
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


export default ManageSurveyPropertiesPage
