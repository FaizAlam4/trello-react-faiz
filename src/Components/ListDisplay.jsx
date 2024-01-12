/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import ListView from "./ListView";
import "./ListDisplay.css";
import BasicAlerts from "./ErrorComponent";
import { CircularProgress } from "@mui/material";
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
  const [inputval, setInputval] = useState("");
  const [err, setErr] = useState(false);

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

  let createList = (val) => {
    axios
      .post(
        `https://api.trello.com/1/lists?name=${val}&idBoard=${id}&key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`
      )
      .then((data) => {
        setRes([...res, data.data]);
        setAnchorEl(null);
        setInputval("");
      })
      .catch((err) => {
        console.log(err);
        setAnchorEl(null);
        setInputval("");
        setErr(true);
      });
  };

  let updateData = (data) => {
    let updateRes = res.filter((ele) => ele.id != data.id);
    setRes(updateRes);
  };

  if (listLoad) {
    return (
      <div className="load">
        <CircularProgress
          sx={{ fontSize: "5rem", display: "block", margin: "auto" }}
        />
      </div>
    );
  }

  return (<>
    <div className="wrap-flex">
      {res.map((element) => (
        <ListView
          key={element.id}
          element={element}
          updateData={updateData}
          boardId={id}
          setErr={setErr}
        />
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
          style={{
            width: "100%",
            height: "100%",
            paddingTop: "10px",
            fontSize: "1rem",
          }}
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
              minHeight: "100px",
              padding: "10px",
              marginTop: "20px",
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createList(inputval);
              }}
            >
              <input
                value={inputval}
                onChange={(e) => {
                  setInputval(e.target.value);
                }}
                type="text"
                placeholder="list-title"
                required
                autoFocus='open'
              />
              <br />
              <button className={`list-btn`}>Add list</button>
            </form>
          </Box>
        </Popper>
      </div>
    </div>
    {err ? <BasicAlerts /> : null}
    </>
  );
}

export default ListDisplay;
