import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import ListView from "./ListView";
import "./ListDisplay.css";
import AddIcon from "@mui/icons-material/Add";

function ListDisplay() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const ide = open ? "simple-popper" : undefined;
  const [res, setRes] = useState([]);
  const [listLoad, setlistLoad] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/boards/${id}/lists?key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`
      )
      .then((data) => data.data)
      .then((result) => {
        setRes(result);
        setlistLoad(false);
      })
      .catch(() => {
        console.log("Error occured...");
      });
  }, []);

  if (listLoad) {
    return (
      <div
        style={{
          fontSize: "2rem",
          width: "600px",
          margin: "auto",
          fontWeight: "bold",
          marginTop: "30vh",
          color: "grey",
        }}
      >
        Loading list items......
      </div>
    );
  }

  return (
    <div className="wrap-flex">
      {res.map((element) => (
        <ListView key={element.id} element={element} />
      ))}

      <div className="wrap-item-fix">
        <div onClick={handleClick}>
          {" "}
          <AddIcon sx={{ paddingRight: "5px" }} />{" "}
        </div>{" "}
        <div
          aria-describedby={ide}
          type="button"
          onClick={handleClick}
          style={{ width: "100%", height: "100%", paddingTop: "10px" }}
        >
          Add another list
        </div>
        <Popper id={ide} open={open} anchorEl={anchorEl}>
          <Box
            sx={{
              border: 0,
              p: 1,
              bgcolor: "white",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            }}
          >
            <input type="text" placeholder="title" />
            <br />
            <button className={`list-btn`}>Add list</button>
          </Box>
        </Popper>
      </div>
    </div>
  );
}

export default ListDisplay;
