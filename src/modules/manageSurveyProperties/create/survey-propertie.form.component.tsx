import useRoles from "hooks/useRoles.hook";
import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import InputComponent from '../../../components/inputForm/input.component';
import { Interface } from "store/app/survey-propertie";


export default function SurveyPropertieForm({ currentData, setCurrentData, hideFields, blockFields }: {
  hideFields?: { status?: boolean, rol?: boolean }
  blockFields?: { email?: boolean }
  currentData: Interface
  setCurrentData(data: any): void
}) {
  const { roles } = useRoles()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentData({ ...currentData, [e.target.name]: value });
  };

  const typeOfData = ['text', 'number', 'date', 'select', 'checkbox', 'radio', 'textarea'];

  return (
    <>
      <InputComponent required label="Nombre del campo*" setHandle={handleChange} name="propertie" value={currentData?.propertie} type="string" version="group" />

      <InputGroup className="mb-3">
        <InputGroup.Text>Tipo de dato:</InputGroup.Text>
        <Form.Select aria-label="Default select example" onChange={e => setCurrentData({ ...currentData, type_form: e?.target?.value })}>
          <option value="">Selecciona un tipo de dato</option>
          {typeOfData?.map((item: string) => (
            <option key={item} value={item} selected={currentData?.type_form === item}>{item}</option>
          ))}
        </Form.Select>
      </InputGroup>

      {currentData?._id && hideFields?.status !== true &&
        <>
          <Form.Label className="mb-2">Estado de actividad:</Form.Label>
          <InputGroup className="mb-3">
            <Form.Check inline type="switch" id="basic-addon45" checked={currentData?.status} name="status" onChange={e => setCurrentData({ ...currentData, status: e?.target?.checked })} />
          </InputGroup>
        </>
      }

    </>
  );
}