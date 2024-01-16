/* eslint-disable react/prop-types */
// import React from 'react'
import { Link } from "react-router-dom";
import "./CardList.css";
import Speeddial from "./Speeddial";
import { useState } from "react";

function CardList({
  data,
  element,
  cardData,
  updateCardData,
  boardId,
  setErr,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{display:'flex'}}>
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-between",
        }}
      >
        <Link
          to={`/card/${data.id}`}
          state={{
            element: cardData,
            element2: element["name"],
            element3: boardId,
            element4: data
          }}
        >
          <div className="card-list">
            <button
              className="open-card-btn"
              onMouseEnter={() => {
                setOpen(true);
              }}
              onMouseLeave={() => {
                setOpen(false);
              }}
            >
              {data.name}{" "}
            </button>
          </div>
        </Link>
      </div>
      <div
        onMouseLeave={() => {
          setOpen(false);
        }}
        onMouseEnter={() => {
          setOpen(true);
        }}
      >
        {open && (
          <Speeddial
            data={data}
            updateCardData={updateCardData}
            setErr={setErr}
          />
        )}
      </div>
    </div>
  );
}

export default CardList;
