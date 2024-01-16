/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import LinearProgress from "@mui/material/LinearProgress";
import "./ChecklistView.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import Box from "@mui/material/Box";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { useEffect, useReducer } from "react";
import apiService from "../API/api";
import { CircularProgress } from "@mui/material";
import BasicAlerts from "./ErrorComponent";
import reducer from "../Reducer/reducer.js";
import * as actionTypes from "../Reducer/actionType.js";

function ChecklistView({ data, updateChecklist }) {
  const initialState = {
    open: false,
    checkItem: [],
    inputval: "",
    load: true,
    err: false,
    checkedItems: [],
  };

  const [currentState, dispatch] = useReducer(reducer, initialState);

  const handleCheckboxChange = (id) => {
    let updatedData = currentState.checkedItems.includes(id)
      ? currentState.checkedItems.filter((id2) => id2 != id)
      : [...currentState.checkedItems, id];
    dispatch({ type: actionTypes.SET_CHECKEDITEMS, payload: updatedData });
  };

  const handleClick = () => {
    dispatch({ type: actionTypes.TOGGLE_OPEN, payload: !currentState.open });
  };

  const handleClickAway = () => {
    dispatch({ type: actionTypes.TOGGLE_OPEN, payload: false });
  };

  const deleteChecklist = (data) => {
    apiService
      .delete(`checklists/${data.id}?`)
      .then((res) => {
        console.log(res);
        updateChecklist(data.id);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: actionTypes.SET_ERROR, payload: true });
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

  useEffect(() => {
    apiService.get(`checklists/${data.id}/checkItems?`).then((res) => {
      dispatch({ type: actionTypes.SET_CHECKITEM, payload: res });
      dispatch({ type: actionTypes.SET_LOAD, payload: false });
    });
  }, []);

  const createCheckitems = (data) => {
    apiService
      .post(`checklists/${data.id}/checkItems?name=${currentState.inputval}&`)
      .then((res) => {
        dispatch({
          type: actionTypes.SET_CHECKITEM,
          payload: [...currentState.checkItem, res],
        });
        dispatch({ type: actionTypes.TOGGLE_OPEN });
        dispatch({ type: actionTypes.SET_INPUT_VALUE, payload: "" });
        dispatch({ type: actionTypes.SET_ERROR, payload: false });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: actionTypes.SET_ERROR, payload: true });
        dispatch({ type: actionTypes.TOGGLE_OPEN });
      });
  };

  const deleteCheckitem = (id) => {
    apiService
      .delete(`checklists/${data.id}/checkItems/${id}?`)
      .then(() => {
        let ans = currentState.checkItem.filter((ele) => ele.id != id);
        dispatch({ type: actionTypes.SET_CHECKITEM, payload: ans });
        if (currentState.checkedItems.includes(id)) {
          let newVal = currentState.checkedItems.filter((ele) => ele != id);
          dispatch({ type: actionTypes.SET_CHECKEDITEMS, payload: newVal });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Couldn't delete this checkitem");
      });
  };

  let barValue =
    currentState.checkItem.length == 0
      ? 0
      : (currentState.checkedItems.length / currentState.checkItem.length) *
        100;

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
      {currentState.load ? (
        <div>
          <CircularProgress
            sx={{ fontSize: "5rem", display: "block", margin: "auto" }}
          />
        </div>
      ) : (
        currentState.checkItem.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexFlow: "row wrap",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <div>
                <input
                  className="checkitm"
                  type="checkbox"
                  checked={currentState.checkedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
                <label htmlFor="op" style={{ padding: "10px" }}>
                  {item.name}
                </label>
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
            {currentState.open ? (
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
                    value={currentState.inputval}
                    onChange={(e) => {
                      dispatch({
                        type: actionTypes.SET_INPUT_VALUE,
                        payload: e.target.value,
                      });
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
        {currentState.err ? <BasicAlerts /> : null}
      </div>
    </div>
  );
}

export default ChecklistView;
