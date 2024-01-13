/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./ListView.css";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import CardList from "./CardList";
import ArchiveListener from "./ArchiveListener";
import apiService from "../API/api";

function ListView({ element, updateData, boardId, setErr }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const idf = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let createCard = (val) => {
 
    apiService.post(`cards?idList=${element.id}&name=${val}&`).then((data)=>{
      setCardData([...cardData,data]);
      setAnchorEl(null)
      setCardinput("")
    }).catch(()=>{
      alert("Couldn't add card")
      setAnchorEl(null)
      setCardinput("")
    })
  };

  useEffect(() => {
 
    apiService.get(`lists/${element.id}/cards?`).then((data)=>{
      setCardData(data)
    }).catch((err)=>{
      console.log(err)
    })
  }, []);

  const [cardData, setCardData] = useState([]);
  const [cardInput, setCardinput] = useState("");

  const updateCardData = (id) => {
    let updatedResult = cardData.filter((ele) => ele.id != id);
    setCardData(updatedResult);
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
            updateData={updateData}
            setErr={setErr}
          />
        </div>
      </div>

      <div className="card-wrap">
        {cardData.map((ele) => {
          return (
            <CardList
              key={ele.id}
              data={ele}
              element={element}
              cardData={cardData}
              updateCardData={updateCardData}
              boardId={boardId}
              setErr={setErr}
            />
          );
        })}
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
