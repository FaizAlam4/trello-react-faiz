/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./ListView.css";
import axios from "axios";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import CardList from "./CardList";
import ArchiveListener from "./ArchiveListener";

function ListView({ element,updateData}) {
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
    axios
      .post(
        `https://api.trello.com/1/cards?idList=${element.id}&name=${val}&key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`
      )
      .then((data) => {
        setCardData([...cardData, data.data]);
        setAnchorEl(null);
        setCardinput('')
      })
      .catch(() => {
        alert("Couldn't add card");
        setAnchorEl(null);
        setCardinput('')
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/lists/${element.id}/cards?key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`
      )
      .then((data) => {
        setCardData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [cardData, setCardData] = useState([]);
  const [cardInput, setCardinput] = useState("");

  const updateCardData=(id)=>{
    
  let updatedResult=cardData.filter((ele)=> ele.id!=id)
  setCardData(updatedResult)
  }

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
          <ArchiveListener data={element} updateData={updateData}/>
        </div>
      </div>

      <div className="card-wrap">
        {cardData.map((ele) => {
          return <CardList key={ele.id} data={ele} element={element} cardData={cardData} updateCardData={updateCardData} />;
        })}
      </div>

      <Button
        aria-describedby={idf}
        variant="contained"
        onClick={handleClick}
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
          <div className="ac" style={{ color: "white"}}>
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
                placeholder="name"
                type="text"
                required
                onChange={(e) => {
                  setCardinput(e.target.value);
                }}
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
