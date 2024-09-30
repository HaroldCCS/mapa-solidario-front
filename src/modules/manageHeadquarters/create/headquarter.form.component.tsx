import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Interface } from "store/app/headquarter";
import InputComponent from '../../../components/inputForm/input.component';


export default function HeadquarterFormComponent({ modelData, setModelData }: { modelData: Partial<Interface>, setModelData(data: any): void }) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setModelData({ ...modelData, [e.target.name]: value });
  };

  return (
    <>
			<InputComponent required label="Nombre" setHandle={handleChange} name="name" value={modelData?.name} type="string" version="group"  />
			<InputComponent required label="Descripción" setHandle={handleChange} name="description" value={modelData?.description} type="string" version="group"  />
    </>
  );
}