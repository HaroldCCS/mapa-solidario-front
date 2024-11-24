import useRoles from "hooks/useRoles.hook";
import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Interface as InterfaceRol } from "store/app/rol";
import { Interface } from "store/app/allUsers";
import InputComponent from '../../../components/inputForm/input.component';


export default function UserFormComponent({ userData, setUserData, hideFields, blockFields }: {
  hideFields?: { status?: boolean, rol?: boolean }
  blockFields?: { email?: boolean }
  userData: Interface
  setUserData(data: any): void
}) {
  const { roles } = useRoles()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserData({ ...userData, [e.target.name]: value });
  };

  return (
    <>
      <InputComponent required label="Nombre*" setHandle={handleChange} name="name" value={userData?.name} type="string" version="group" />
      <InputComponent required label="Correo*" setHandle={handleChange} name="email" value={userData?.email} disabled={blockFields?.email} type="email" version="group" />
      <InputComponent required label="Celular*" setHandle={handleChange} name="cell_phone" value={userData?.cell_phone} type="string" version="group" />
      <InputComponent required label="Cedula" setHandle={handleChange} name="nit" value={userData?.nit} type="string" version="group" />
      <InputComponent required label="Dirección" setHandle={handleChange} name="address" value={userData?.address} type="string" version="group" />
      <InputComponent required label="Contraseña*" setHandle={handleChange} name="password" value={userData?.password} type="password" version="group" />

      {!hideFields?.rol &&
        <InputGroup className="mb-3">
          <InputGroup.Text>Rol:</InputGroup.Text>
          <Form.Select aria-label="Default select example" onChange={e => setUserData({ ...userData, rol: e?.target?.value })}>
            <option value="">Selecciona un rol</option>
            {roles?.map((item: InterfaceRol) => (
              <option key={item._id} value={item._id} selected={userData?.rol === item._id}>{item.name}</option>
            ))}
          </Form.Select>
        </InputGroup>
      }

      {userData?._id && hideFields?.status !== true &&
        <>
          <Form.Label className="mb-2">Estado de actividad:</Form.Label>
          <InputGroup className="mb-3">
            <Form.Check inline type="switch" id="basic-addon45" checked={userData?.status} name="status" onChange={e => setUserData({ ...userData, status: e?.target?.checked })} />
          </InputGroup>
        </>
      }

    </>
  );
}