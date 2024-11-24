import React, { useEffect, useState } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from './index.module.scss';
import LoaderGoogleComponent from '../../../components/loaders/loaderV2/loaderGoogle.component';
import { FiUserPlus } from "react-icons/fi";
import SurveyPropertieForm from "./survey-propertie.form.component";
import { Interface } from "store/app/survey-propertie";
import useSurveyProperties from "hooks/useSurveyProperties.hook";


function SurveyPropertieCreateComponent(props: {
  hideFields?: { status?: boolean, rol?: boolean }
  blockFields?: { email?: boolean }
  hideCreate?: boolean
  currentData?: any
  setShow: (show: boolean) => void
  show: boolean
  clientDefault?: boolean
}) {
  const { update, add } = useSurveyProperties({ noGet: true });
  const { show, setShow } = props


  const [currentData, setCurrentData] = useState<any>(Object.keys(props?.currentData)?.length ? props.currentData : { status: true });

  useEffect(() => {
    setCurrentData(props?.currentData || {})
  }, [props?.currentData])
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);

    if (currentData?._id) {
      await update(currentData)
    } else {
      const new_data = { ...currentData, status: true }
      await add(new_data);
    }
    setShow(false);
    setIsLoading(false);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {props.hideCreate || <Button variant="outline-primary" onClick={handleShow} size="sm">
        Agregar campo <FiUserPlus className={styles.svg} />
      </Button>}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="xl"
        style={{ padding: '0rem !important' }}
      >

        <HeaderComponent incremental={currentData?.incremental} />

        {isLoading ? <LoaderGoogleComponent /> : <>
          <Modal.Body className="pb-4"><SurveyPropertieForm currentData={currentData} setCurrentData={setCurrentData} hideFields={props.hideFields} blockFields={props.blockFields} /></Modal.Body>
          <FooterComponent handleClose={handleClose} handleSave={handleSave} currentData={currentData} />
        </>}
      </Modal>
    </>
  );
}

function HeaderComponent({ incremental }: { incremental: string }) {
  return <Modal.Header closeButton>
    <Modal.Title>{incremental ? 'Editar campo ' + incremental : 'Crear campo'}</Modal.Title>
  </Modal.Header>
}

function FooterComponent({ handleClose, handleSave, currentData }: { handleClose: () => void, handleSave: () => void, currentData: Partial<Interface> }) {
  return <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      cancelar
    </Button>
    <Button variant="primary" disabled={!currentData.propertie || !currentData.type_form} onClick={handleSave}>
      {currentData?._id ? 'Guardar' : 'Crear'}
    </Button>
  </Modal.Footer>
}

export default SurveyPropertieCreateComponent;