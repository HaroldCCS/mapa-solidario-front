import React, { useEffect, useState } from "react";
import styles from './index.module.scss';


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsBookmarkPlus } from "react-icons/bs";

import LoaderGoogleComponent from '../../../components/loaders/loaderV2/loaderGoogle.component';
import { Interface } from "store/app/headquarter";
import { Form } from "react-bootstrap";
import HeadquarterFormComponent from "./headquarter.form.component";
import useHeadquarters from "hooks/useHeadquarters.hook";


function HeadquarterCreateComponent(props: {modelData?: any, setShow: (show: boolean) => void, show: boolean }) {
  const { addHeadquarter, updateHeadquarter } = useHeadquarters();
  const {show, setShow} = props


  const [modelData, setModelData] = useState<any>(Object.keys(props?.modelData)?.length ? props.modelData : { status: true});

  useEffect(() => {
    setModelData(props?.modelData || {})
  }, [props?.modelData])
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		const form = event.currentTarget;
		if (!form.checkValidity()) return;

    setIsLoading(true);

    if (modelData?._id) {
      await updateHeadquarter(modelData);
    } else {
      await addHeadquarter(modelData);
    }
    setShow(false);
    setIsLoading(false);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow} size="sm">
        Crear cliente <BsBookmarkPlus className={styles.svg} />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="xl"
        style={{ padding: '0rem !important' }}
      >

        <HeaderComponent incremental={modelData?.incremental} />

        {isLoading ?
          <LoaderGoogleComponent />
          :
          <Form onSubmit={handleSave}>
            <Modal.Body className="pb-4">
              <HeadquarterFormComponent modelData={modelData} setModelData={setModelData} />
            </Modal.Body>
            <FooterComponent handleClose={handleClose} modelData={modelData} />
          </Form>
        }
      </Modal>
    </>
  );
}

function HeaderComponent({ incremental }: { incremental: string }) {
  return <Modal.Header closeButton>
    <Modal.Title>{incremental ? 'Editar cliente id ' + incremental : 'Crear cliente'}</Modal.Title>
  </Modal.Header>
}

function FooterComponent({ handleClose, modelData }: { handleClose: () => void, modelData: Partial<Interface> }) {
  return <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      cancelar
    </Button>
    <Button variant="primary" type="submit">
      {modelData?._id ? 'Guardar' : 'Crear'}
    </Button>
  </Modal.Footer>
}

export default HeadquarterCreateComponent;