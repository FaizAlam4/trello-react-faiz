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

function ChecklistView({ data, updateChecklist }) {
  const [checkItem, setCheckitem] = useState([]);
  const [open, setOpen] = useState(false);
  const [inv, setInv] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [load, setLoad] = useState(true);
  const [err, setErr] = useState(false);

  const handleCheckboxChange = (id) => {
    let updatedData = checkedItems.includes(id)
      ? checkedItems.filter((id2) => id2 != id)
      : [...checkedItems, id];
    setCheckedItems(updatedData);
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const deleteChecklist = (data) => {
    // axios
    //   .delete(
    //     `https://api.trello.com/1/checklists/${data.id}?key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     console.log("card deleted..");
    //     updateChecklist(data.id);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setErr(true);
    //   });
    apiService.delete(`checklists/${data.id}?`).then((res)=>{
      console.log(res)
      updateChecklist(data.id)
    }).catch((err)=>{
      console.log(err)
      setErr(true)
    })
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

    apiService.get(`checklists/${data.id}/checkItems?`).then((res)=>{
      setCheckitem(res)
      setLoad(false)
    })
  }, []);

  const createCheckitems = (data) => {

    apiService.post(`checklists/${data.id}/checkItems?name=${inv}&`).then((res)=>{
setCheckitem([...checkItem,res])
setOpen(false)
setInv('')
    }).catch((err)=>{
      console.log(err)
      setErr(true)
      setOpen(false)
    })
  };

  const deleteCheckitem = (id) => {
    // axios
    //   .delete(
    //     `https://api.trello.com/1/checklists/${data.id}/checkItems/${id}?key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`
    //   )
    //   .then(() => {
    //     let ans = checkItem.filter((ele) => ele.id != id);
    //     setCheckitem(ans);
    //     if (checkedItems.includes(id)) {
    //       let newVal = checkedItems.filter((ele) => ele != id);
    //       setCheckedItems(newVal);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     alert("Couldn't delete this checkitem");
    //   });
    apiService.delete(`checklists/${data.id}/checkItems/${id}?`).then(()=>{
      let ans = checkItem.filter((ele) => ele.id != id);
        setCheckitem(ans);
        if (checkedItems.includes(id)) {
          let newVal = checkedItems.filter((ele) => ele != id);
          setCheckedItems(newVal);
        }
    }).catch((err)=>{
      console.log(err)
      alert("Couldn't delete this checkitem");
    })
  };

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
          gap: "40px",
          alignItems: "center",
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
              }}
            >
              <div>
                <input
                  className="checkitm"
                  type="checkbox"
                  checked={checkedItems.includes(item.id)}
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
