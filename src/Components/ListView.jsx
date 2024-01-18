/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./ListView.css";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import CardList from "./CardList";
import ArchiveListener from "./ArchiveListener";
import RotateRightIcon from '@mui/icons-material/RotateRight';
import apiService from "../API/api";
import {useDispatch, useSelector} from 'react-redux' 
import { showCard, createMyCard } from "../feature/cardSlice.js";

function ListView({ element, boardId}) {
const dispatch=useDispatch()
const { cardData } = useSelector((state) => ({
  cardData: state.card.cardData[element.id] || [],
}));



  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const idf = open ? "simple-popover" : undefined;
  const [load, setLoad] = useState(true);
  const [cardInput, setCardinput] = useState("");


  useEffect(() => {
    apiService
      .get(`lists/${element.id}/cards?`)
      .then((data) => {
        dispatch(showCard({ listId: element.id, cards: data }))
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let createCard = (val) => {
    apiService
      .post(`cards?idList=${element.id}&name=${val}&`)
      .then((data) => {
      
        dispatch(createMyCard({ listId: element.id, card: data }))
      
        setAnchorEl(null);
        setCardinput("");
      })
      .catch(() => {
        alert("Couldn't add card");
        setAnchorEl(null);
        setCardinput("");
      });
  };


  return (
    <div className="wrap-item">
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div>{element.name}</div>
        <div>
          <ArchiveListener
            data={element}
          />
        </div>
      </div>

      <div className="card-wrap">
        {load ? (
          <div style={{margin:"auto"}}><RotateRightIcon/></div>
        ) : (
          cardData.map((ele) => {
            return (
              <CardList
                key={ele.id}
                data={ele}
                element={element}
                cardData={cardData}
                boardId={boardId}
              />
            );
          })
        )}
      </div>

      <Button
        aria-describedby={idf}
        variant="contained"
        onClick={handleClick}
        disableRipple
        sx={{
          width: "100%",
          outline: "none",
          marginLeft: "5px",
          fontSize: "1rem",
        }}
      >
        <div className="card-add-strip">
          <div>
            <AddIcon sx={{ paddingRight: "5px", color: "white" }} />
          </div>
          <div className="ac" style={{ color: "white" }}>
            Add a card
          </div>
        </div>
      </Button>
      <Popover
        id={idf}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{ marginTop: "30px" }}
      >
        <div className="add-card">
          <div>
            <form
              style={{ padding: "10px" }}
              onSubmit={(e) => {
                e.preventDefault();
                createCard(cardInput);
              }}
            >
              <input
                value={cardInput}
                placeholder="card-title"
                type="text"
                required
                onChange={(e) => {
                  setCardinput(e.target.value);
                }}
                autoFocus="open"
              />
              <button className="card-btn" type="submit">
                Add card
              </button>
            </form>
          </div>
        </div>
      </Popover>
    </div>
  );
}

export default ListView;
