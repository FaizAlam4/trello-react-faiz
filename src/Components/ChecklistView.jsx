/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import LinearProgress from "@mui/material/LinearProgress";
import "./ChecklistView.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import Box from "@mui/material/Box";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { useEffect, useState } from "react";
import apiService from "../API/api";
import { CircularProgress } from "@mui/material";
import BasicAlerts from "./ErrorComponent";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyChecklist } from "../feature/checklistSlice.js";
import {
  showCheckitem,
  createCheckitem,
  deleteMyCheckitem,
} from "../feature/checkitemSlice.js";

function ChecklistView({ data, onCard }) {
  const dispatch = useDispatch();
  const { checkItem } = useSelector((state) => ({
    checkItem: state.checkitem.checkItem[data.id] || [],
  }));

  const [open, setOpen] = useState(false);
  const [inv, setInv] = useState("");
  const [load, setLoad] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    apiService.get(`checklists/${data.id}/checkItems?`).then((res) => {
      dispatch(showCheckitem({ checkListId: data.id, itemData: res }));
      setLoad(false);
    });
  }, []);

  const handleCheckboxChange = (itemId, itemState) => {
    apiService
      .put(
        `cards/${onCard.id}/checkItem/${itemId}?state=${
          itemState == "complete" ? "incomplete" : "complete"
        }&`
      )
      .then((data) => {
        console.log("Successful:", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const deleteChecklist = (data) => {
    apiService
      .delete(`checklists/${data.id}?`)
      .then((res) => {
        console.log(res);
        dispatch(deleteMyChecklist(data));
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
      });
  };

  const createCheckitems = (data) => {
    apiService
      .post(`checklists/${data.id}/checkItems?name=${inv}&`)
      .then((res) => {
        dispatch(createCheckitem({ checkListId: data.id, itemData: res }));
        setOpen(false);
        setInv("");
        setErr(false);
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
        setOpen(false);
      });
  };

  const deleteCheckitem = (id) => {
    apiService
      .delete(`checklists/${data.id}/checkItems/${id}?`)
      .then(() => {
        // setCheckitem((prevData) => prevData.filter((ele) => ele.id != id));
        dispatch(deleteMyCheckitem({ checkListId: data.id, checkItemId: id }));
      })
      .catch((err) => {
        console.log(err);
        alert("Couldn't delete this checkitem");
      });
  };

  const styles = {
    position: "absolute",
    top: -100,
    right: 0,
    left: 0,
    zIndex: 1,
    width: "180px",
    border: "none",
    p: 1,
    bgcolor: "background.paper",
    fontWeight: "400",
    fontSize: "1rem",
    borderRadius: "5px",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
  };

  let checkedItems = checkItem.filter((ele) => {
    return ele.state == "complete";
  });
  let barValue =
    checkItem.length == 0 ? 0 : (checkedItems.length / checkItem.length) * 100;

  barValue = parseInt(barValue.toFixed(0));

  return (
    <div className="chk-wrap">
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-between",
          alignContent: "center",
          gap: "40px",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div>
          <ChecklistRtlIcon
            sx={{ paddingTop: "4px", position: "relative", top: "4px" }}
          />{" "}
          {data.name}{" "}
        </div>
        <div>
          <button
            style={{
              padding: "5px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => {
              deleteChecklist(data);
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <div>
        <LinearProgress
          variant="determinate"
          value={barValue}
          sx={{ marginTop: "20px", paddingBottom: "5px" }}
        />
        <div style={{ textAlign: "center", fontSize: "small" }}>
          {barValue}%
        </div>
      </div>
      {load ? (
        <div>
          <CircularProgress
            sx={{ fontSize: "5rem", display: "block", margin: "auto" }}
          />
        </div>
      ) : (
        checkItem.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexFlow: "row wrap",
                justifyContent: "space-around",
                alignItems: "center",
                textAlign: "left",
              }}
            >
              <div className="first-div">
                <div
                  style={{
                    display: "flex",
                    flexFlow: "row nowrap",
                    alignItems: "center",
                    width: "200px",
                  }}
                >
                  <div style={{ paddingBottom: "5px", paddingLeft: "20px" }}>
                    <input
                      className="checkitm"
                      type="checkbox"
                      checked={item.state == "complete" ? true : false}
                      onChange={() => handleCheckboxChange(item.id, item.state)}
                    />
                  </div>
                  <div
                    className="op"
                    style={{
                      padding: "10px",
                      overflow: "scroll",

                      paddingTop: "29px",
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              </div>
              <div>
                <button
                  style={{
                    float: "right",
                    padding: "5px",
                    border: "none",
                    backgroundColor: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    deleteCheckitem(item.id);
                  }}
                >
                  <DeleteIcon fontSize="small" sx={{ marginTop: "25px" }} />
                </button>
              </div>
            </div>
          );
        })
      )}

      <div>
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box sx={{ position: "relative", marginTop: "20px" }}>
            <button
              style={{ padding: "5px" }}
              type="button"
              onClick={handleClick}
            >
              Add an item
            </button>
            {open ? (
              <Box sx={styles}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    createCheckitems(data);
                  }}
                >
                  <input
                    style={{ fontSize: "0.8rem" }}
                    type="text"
                    value={inv}
                    onChange={(e) => {
                      setInv(e.target.value);
                    }}
                    placeholder="item title.."
                    required
                    autoFocus="open"
                  />
                  <button
                    style={{
                      padding: "5px",
                      minWidth: "20px",
                      margin: "auto",
                      display: "block",
                      marginTop: "10px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                      border: "none",
                      backgroundColor: "#5252ff",
                      color: "white",
                      borderRadius: "2px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Add
                  </button>
                </form>
              </Box>
            ) : null}
          </Box>
        </ClickAwayListener>
        {err ? <BasicAlerts /> : null}
      </div>
    </div>
  );
}

export default ChecklistView;
