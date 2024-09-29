import useRoles from "hooks/useRoles.hook";
import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Interface as InterfaceRol } from "store/app/rol";
import { Interface } from "store/app/allUsers";


export default function UserFormComponent({ userData, setUserData, clientDefault }: { userData: Interface, setUserData(data: any): void, clientDefault?: boolean }) {
  const { roles } = useRoles()

  useEffect(() => {
    if (roles.length && clientDefault) setUserData({ ...userData, roles: roles?.find(item => item._id === 'cliente')?._id })
  }, [roles])

  useEffect(() => {
    if (clientDefault && userData?.email) setUserData({ ...userData, password: userData?.email })
  }, [userData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserData({ ...userData, [e.target.name]: value });
  };

  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"> Nombre*</InputGroup.Text>
        <Form.Control
          name="name"
          value={userData?.name}
          placeholder="Nombre"
          aria-label="name"
          aria-describedby="name"
          onChange={handleChange}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"> Correo*</InputGroup.Text>
        <Form.Control
          name="email"
          value={userData?.email}
          placeholder="ejemplo@ejemplo.com"
          aria-label="email"
          aria-describedby="email"
          onChange={handleChange}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"> Celular*</InputGroup.Text>
        <Form.Control
          name="cell_phone"
          value={userData?.cell_phone}
          placeholder="3192345678"
          aria-label="cell_phone"
          aria-describedby="cell_phone"
          onChange={handleChange}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"> Cedula </InputGroup.Text>
        <Form.Control
          name="nit"
          value={userData?.nit}
          placeholder="1000123456"
          aria-label="nit"
          aria-describedby="nit"
          onChange={handleChange}
        />
      </InputGroup>

      {!clientDefault ?
        <>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"> Contraseña* </InputGroup.Text>
        <Form.Control
          type="password"
          name="password"
          placeholder="******"
          aria-label="password"
          aria-describedby="password"
          onChange={handleChange}
        />
      </InputGroup>
      </>
        :  "La contraseña del cliente sera el correo"}

      {userData?._id &&
        <>
          <Form.Label className="mb-2">Estado de actividad:</Form.Label>
          <InputGroup className="mb-3">
            <Form.Check inline type="switch" id="basic-addon45" checked={userData?.status} name="group1" onChange={e => setUserData({ ...userData, status: e?.target?.checked })} />
          </InputGroup>
        </>
      }

    </>
  );
}