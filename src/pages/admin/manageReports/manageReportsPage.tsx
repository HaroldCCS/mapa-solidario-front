import React, { useEffect, useState } from 'react'
import * as XLSX from "xlsx";

import styles from './index.module.scss';
import HeaderTurnBackComponent from 'components/header_turn_back/header_turn_back.component';
import { Fade } from 'react-awesome-reveal';
import CardReportComponent from './cardReport/cardReportComponent';
import ReportService from 'services/app/report.service';
import Swal from 'sweetalert2';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


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

	//------ reporte estadsiticas

	const [statistics, setStatistics] = useState<any>({
		labels: [],
		datasets: [],
	})

	useEffect(() => {
		const getStatistics = async () => {
			const response = await service.generateReportSurveysStatistics()
			console.log('response', response)
			if (!response?.length) return

			const labels = response?.map((item: {label: string}) => item?.label)
			const values = response?.map((item: {value: number}) => item?.value)
			
			setStatistics({
				labels,
				datasets: [
					{
						label: 'Datos',
						data: values,
						backgroundColor: 'rgba(255, 99, 132, 0.5)',
					}
				],
			})
		}
		getStatistics()
	}, [])

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

			<Fade>
				<div className='d-flex justify-content-evenly align-items-center flex-wrap gap-3 mt-5'>

				<Bar
					options={{
						responsive: true,
						plugins: {
							legend: {
								position: 'top' as const,
							},
							title: {
								display: true,
								text: 'Estadisticas de encuestas: preguntas que han sido contestadas por beneficiarios',
							},
						},
					}}
					data={statistics}
				/>
				</div>
			</Fade>

		</div>
	)
}


export default ManageReportsPage
