/* eslint-disable react/prop-types */
// import React from 'react'
import { Link } from "react-router-dom";
import "./CardList.css";
import Speeddial from "./Speeddial";

function CardList({ data, element, cardData,updateCardData }) {
  return (
    <>
      <Link
        to={`/card/${data.id}`}
        state={{ element: cardData, element2: element["name"] }}
      >
        <div className="card-list">
          <button className="open-card-btn">{data.name} </button>
        </div>
      </Link>
      <Speeddial data={data} updateCardData={updateCardData}/>
    </>
  );
}

export default CardList;
