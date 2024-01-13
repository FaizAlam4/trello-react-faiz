/* eslint-disable react/prop-types */
import "./FormComponent.css";
import { useState } from "react";
import Logo from "../assets/formLogo.svg";

function FormComponent({ handleForm }) {
  const [inp, setInp] = useState("");

  let handleInput = (e) => {
    setInp(e.target.value);
  };
  return (
    <div className="form">
      <img className="ig" src={Logo} alt="" />
      <label style={{ marginTop: "70px", display: "block", padding: "15px" }}>
        Board Title <small style={{ color: "red" }}>*</small>
      </label>
      <input type="text" value={inp} onChange={handleInput} autoFocus='open' />

      <button
        onClick={() => {
          handleForm(inp);
        }}
        className="btn"
      >
        Create
      </button>
    </div>
  );
}

export default FormComponent;
