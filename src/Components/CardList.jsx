/* eslint-disable react/prop-types */
// import React from 'react'
import { Link } from "react-router-dom";
import "./CardList.css";
import Speeddial from "./Speeddial";
import { useState } from "react";

function CardList({ data, element, cardData, updateCardData, boardId }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Link
        to={`/card/${data.id}`}
        state={{ element: cardData, element2: element["name"], element3:boardId }}
      >
        <div className="card-list">
          <button
            className="open-card-btn"
            onMouseEnter={() => {
              setOpen(true);
            }}
           
          >
            {data.name}{" "}
          </button>
        </div>
      </Link>
      {open && <Speeddial data={data} updateCardData={updateCardData} />}
    </>
  );
}

export default CardList;
