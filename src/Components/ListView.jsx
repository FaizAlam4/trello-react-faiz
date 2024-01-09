/* eslint-disable react/prop-types */
import "./ListView.css";
import axios from "axios";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CardList from "./CardList";

function ListView({ element }) {
  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/lists/${element.id}/cards?key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`
      )
      .then((data) => {
        console.log(data.data);
        setCardData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [cardData, setCardData] = useState([]);

  return (
    <div className="wrap-item">
      <div>{element.name}</div>

      <div className="card-wrap">
        {cardData.map((ele) => {
          return <CardList key={cardData.id} data={ele} />;
        })}
      </div>

      <button className="card-button">
        <div className="card-add-strip">
          <div>
            <AddIcon sx={{ paddingRight: "5px" }} />
          </div>
          <div>Add a card</div>
        </div>
      </button>
    </div>
  );
}

export default ListView;
