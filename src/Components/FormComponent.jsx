/* eslint-disable react/prop-types */

import "./FormComponent.css";
import axios from "axios";
import { useState } from "react";
import Logo from "../assets/formLogo.svg";

function FormComponent({ func}) {
  const [inp, setInp] = useState("");


  let handleForm = () => {
    axios
      .post(
        `https://api.trello.com/1/boards/?name=${inp}&key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`
      )
      .then(() => {
        console.log("Data sent successfully");
     
        func(false);
      })
      .catch(() => {
        alert("Couldn't create board!");
        func(false);
      });
  };

  let handleInput = (e) => {
    setInp(e.target.value);
  };
  return (
    <div className="form">
      <img className="ig" src={Logo} alt="" />
      <label style={{ marginTop: "70px", display: "block", padding: "15px" }}>
        Board Title <small style={{ color: "red" }}>*</small>
      </label>
      <input type="text" value={inp} onChange={handleInput} />

      <button onClick={handleForm} className="btn">
        Create
      </button>
    </div>
  );
}

export default FormComponent;
