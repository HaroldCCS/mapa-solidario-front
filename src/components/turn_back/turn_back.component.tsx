import React from "react"
import { IoReturnDownBack } from "react-icons/io5";
import { Link } from "react-router-dom";


function TurnBackComponent({ route }: { readonly route: string }) {
  return (<Link to={route}><IoReturnDownBack size={32} /></Link>);
}

export default TurnBackComponent;