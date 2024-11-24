import React, { useEffect, useState } from 'react'
import * as XLSX from "xlsx";

import styles from './index.module.scss';
import HeaderTurnBackComponent from 'components/header_turn_back/header_turn_back.component';
import { Fade } from 'react-awesome-reveal';
import CardReportComponent from './cardReport/cardReportComponent';
import ReportService from 'services/app/report.service';
import Swal from 'sweetalert2';

const ManageReportsPage: React.FC = () => {
	const service = new ReportService();

	const [loadingReportEntities, setLoadingReportEntities] = useState<boolean>(false)
	const [loadingReportSurveys, setLoadingReportSurveys] = useState<boolean>(false)

	const makeReport = async (data: any[], file_name: string) => {
		const worksheet = XLSX.utils.json_to_sheet(data);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja1");

		const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
		const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = file_name + ".xlsx";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

	}

	const generateReportEntities = async () => {
		setLoadingReportEntities(true)
		const response = await service.generateReportEntities()
		console.log('response', response)
		if (response?.length) {
			makeReport(response, 'reporte_entidades')
			Swal.fire({
				icon: 'success',
				title: 'Reporte generado',
				text: 'El reporte se ha generado correctamente',
			});
		}
		setLoadingReportEntities(false)
	}

	const generateReportSurveys = async () => {
		setLoadingReportSurveys(true);
		const response = await service.generateReportSurveys()
		if (response?.length) {
			makeReport(response, 'reporte_encuestas')
			Swal.fire({
				icon: 'success',
				title: 'Reporte generado',
				text: 'El reporte se ha generado correctamente',
			});
		}
		setLoadingReportSurveys(false);

	}


	return (
		<div className={styles.main}>

			{/* start Titulo */}
			<HeaderTurnBackComponent title="Reportes" />
			{/* end Titulo */}

			<Fade>
				<div className='d-flex justify-content-evenly align-items-center flex-wrap gap-3 mt-5'>
					<CardReportComponent
						title="Reporte de entidades"
						onClick={generateReportEntities}
						description="Con este reporte podrás ver los datos generales de las entidades registradas"
						loading={loadingReportEntities}
					/>

					<CardReportComponent
						title="Reporte de encuestas"
						onClick={generateReportSurveys}
						description="Con este reporte podrás ver los datos de las encuestas realizadas por los beneficiarios"
						loading={loadingReportSurveys}
					/>
				</div>

			</Fade>

		</div>
	)
}


export default ManageReportsPage
