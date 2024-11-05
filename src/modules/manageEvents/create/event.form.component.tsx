import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Interface } from "store/app/event";
import InputComponent from '../../../components/inputForm/input.component';
import MiniMapComponent from "../../../components/miniMap/miniMap.component";


export default function EventFormComponent({ eventData, setEventData }: { eventData: Partial<Interface>, setEventData(value: React.SetStateAction<Partial<Interface>>): void }) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEventData({ ...eventData, [e.target.name]: value });
  };

  const handleLocation = (location: number[]) => setEventData(prev => ({ ...prev, location }))
  return (
    <>
      <InputComponent required label="Titulo" setHandle={handleChange} name="title" value={eventData?.title} type="string" version="group" />
      <InputComponent required label="Descripción" setHandle={handleChange} name="description" value={eventData?.description} type="textbox" version="group" />
      <InputComponent required label="Fecha" setHandle={handleChange} name="day" value={eventData?.day} type="datetime-local" version="group" />
      <InputComponent required label="Ubicación" setHandle={handleChange} name="ubication" value={eventData?.ubication} type="string" version="group" />


      {/* Generar input checkbox para activar o desactivar */}
      <InputGroup className="mb-3">
        <InputGroup.Text>Estado</InputGroup.Text>
        <Form.Check className="d-flex align-items-center m-2" inline type="switch" id="status" checked={eventData?.status} name="status" onChange={e => setEventData({ ...eventData, status: e?.target?.checked })} />
      </InputGroup>

      <MiniMapComponent setLocation={handleLocation} disableOnclick={false} location={eventData?.location} />
    </>
  );
}