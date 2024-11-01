import React, { useEffect, useState } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from './index.module.scss';
import { useAppDispatch, useAppSelector } from "store";
import LoaderGoogleComponent from '../../../components/loaders/loaderV2/loaderGoogle.component';
import EventService from "services/app/event.service";
import EventFormComponent from "./event.form.component";
import eventAction from "store/app/event/event.action";
import { FaRegEye } from "react-icons/fa";
import { Interface } from "store/app/event";
import useUser from "hooks/useUser.hook";


function EventCreateComponent(props: { eventData?: any, setShow: (show: boolean) => void, show: boolean, clientDefault?: boolean }) {
  const eventService = new EventService();
  const dispatch = useAppDispatch();
  const {user} = useUser();
  const { show, setShow } = props


  const [eventData, setEventData] = useState<Partial<Interface>>(Object.keys(props?.eventData)?.length ? props.eventData : { status: true });

  useEffect(() => {
    setEventData(props?.eventData || {})
  }, [props?.eventData])
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);

    if (eventData?._id) {
      const response = await eventService.edit(eventData);
      if (response?._id) {
        dispatch(eventAction.update(response));
      }
    } else {
      const user_id = user._id
      const new_event: Partial<Interface> = { ...eventData, user_creator: user_id }
      const response = await eventService.create(new_event);
      if (response?._id) {
        dispatch(eventAction.add(response));
      }
    }
    setShow(false);
    setIsLoading(false);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow} size="sm">
        Crear evento <FaRegEye className={styles.svg} />
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

        <HeaderComponent title={eventData?.title || ''} />

        {isLoading ? <LoaderGoogleComponent /> : <>
          <Modal.Body className="pb-4"><EventFormComponent eventData={eventData} setEventData={setEventData} /></Modal.Body>
          <FooterComponent handleClose={handleClose} handleSave={handleSave} eventData={eventData} />
        </>}
      </Modal>
    </>
  );
}

function HeaderComponent({ title }: { title: string }) {
  return <Modal.Header closeButton>
    <Modal.Title>{title ? 'Editar evento ' + title : 'Crear evento'}</Modal.Title>
  </Modal.Header>
}

function FooterComponent({ handleClose, handleSave, eventData }: { handleClose: () => void, handleSave: () => void, eventData: Partial<Interface> }) {
  return <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      cancelar
    </Button>
    <Button variant="primary" disabled={!eventData.title || !eventData.ubication} onClick={handleSave}>
      {eventData?._id ? 'Guardar' : 'Crear'}
    </Button>
  </Modal.Footer>
}

export default EventCreateComponent;