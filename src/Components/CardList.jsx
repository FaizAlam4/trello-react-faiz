/* eslint-disable react/prop-types */
// import React from 'react'
import { Link } from "react-router-dom";
import "./CardList.css";

function CardList({ data, element, cardData}) {
  console.log(element);
  return (
    <Link
      to={`/card/${data.id}`}
      state={{ element: cardData, element2: element["name"]}}
    >
      <div className="card-list">
        <button className="open-card-btn">{data.name}</button>
      </div>
    </Link>
  );
}

export default CardList;
