/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import ListView from "./ListView";
import "./ListDisplay.css";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import apiService from "../API/api";
import NotFound from "./NotFound";
import { useDispatch, useSelector } from "react-redux";
import { displayList, createMyList,updateList } from "../feature/listSlice";

function ListDisplay() {
  const dispatch = useDispatch();
  const { res } = useSelector((state) => state.list);

  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const ide = open ? "simple-popper" : undefined;
  const [listLoad, setlistLoad] = useState(true);
  const [inputval, setInputval] = useState("");
  const [err, setErr] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const { id } = useParams();

  useEffect(() => {
    apiService
      .get(`boards/${id}/lists?`)
      .then((data) => {
        dispatch(displayList(data));
        setlistLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
        setlistLoad(false);
      });
  }, []);

  let createList = (val) => {
    apiService
      .post(`lists?name=${val}&idBoard=${id}&`)
      .then((data) => {
        dispatch(createMyList(data));
        setAnchorEl(null);
        setInputval("");
        setErr(false);
      })
      .catch((err) => {
        console.log(err);
        setAnchorEl(null);
        setInputval("");
        setErr(true);
      });
  };

  let updateData = (data, setErr) => {
    let updateRes = res.filter((ele) => ele.id != data.id);
    // setRes(updateRes);
    dispatch(updateList(updateRes))
    setErr(false);
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

  return (
    <>
      {err ? (
        <NotFound />
      ) : (
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
                  <CloseIcon
                    sx={{ marginLeft: "192px", cursor: "pointer" }}
                    onClick={() => {
                      setAnchorEl(false);
                    }}
                    fontSize="small"
                  />{" "}
                  <input
                    value={inputval}
                    onChange={(e) => {
                      setInputval(e.target.value);
                    }}
                    type="text"
                    placeholder="list-title"
                    required
                    autoFocus="open"
                  />
                  <br />
                  <button className={`list-btn`}>Add list</button>
                </form>
              </Box>
            </Popper>
          </div>
        </div>
      )}
    </>
  );
}

export default ListDisplay;
