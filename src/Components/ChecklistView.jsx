/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import CheckIcon from "@mui/icons-material/Check";
import LinearProgress from "@mui/material/LinearProgress";
import "./ChecklistView.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import axios from "axios";
import { useEffect, useState } from "react";

function ChecklistView({ data, updateChecklist }) {
  const [checkItem, setCheckitem] = useState([]);
  const [open, setOpen] = useState(false);
  const [inv, setInv] = useState("");

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const deleteChecklist = (data) => {
    axios
      .delete(
        `https://api.trello.com/1/checklists/${data.id}?key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`
      )
      .then((res) => {
        console.log(res);
        console.log("card deleted..");
        updateChecklist(data.id);
      })
      .catch((err) => {
        console.log(err);
        alert("Couldn't delete this checklist");
      });
  };

  const styles = {
    position: "absolute",
    top: 28,
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
    axios
      .get(
        `https://api.trello.com/1/checklists/${data.id}/checkItems?key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`
      )
      .then((res) => {
        console.log(res.data);
        setCheckitem(res.data);
      });
  }, []);

  const createCheckitems = (data) => {
    axios
      .post(
        `https://api.trello.com/1/checklists/${data.id}/checkItems?name=${inv}&key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`
      )
      .then((res) => {
        setCheckitem([...checkItem, res.data]);
        setOpen(false);
        setInv('')
      })
      .catch((err) => {
        console.log(err);
        alert("Couldn't create checklist items!");
        setOpen(false);
      });
  };

  const deleteCheckitem = (id) => {
    axios
      .delete(
        `https://api.trello.com/1/checklists/${data.id}/checkItems/${id}?key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`
      )
      .then(() => {
        let ans = checkItem.filter((ele) => ele.id != id);
        setCheckitem(ans);
      })
      .catch((err) => {
        console.log(err);
        alert("Couldn't delete this checkitem");
      });
  };
  return (
    <div className="chk-wrap">
      <CheckIcon sx={{ paddingTop: "5px" }} /> {data.name}{" "}
      <button
        style={{
          float: "right",
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
      <div>
        <LinearProgress
          variant="determinate"
          value={0}
          sx={{ marginTop: "10px" }}
        />
      </div>
      {checkItem.map((item) => {
        return (
          <>
            <input className="checkitm" type="checkbox" />
            <label style={{ padding: "10px" }}>{item.name}</label>
            <button
              style={{
                float: "right",
                padding: "5px",
                border: "none",
                backgroundColor: "white",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => {
                deleteCheckitem(item.id);
              }}
            >
              <DeleteIcon fontSize="small" />
            </button>

            <br />
          </>
        );
      })}
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
      </div>
    </div>
  );
}

export default ChecklistView;
