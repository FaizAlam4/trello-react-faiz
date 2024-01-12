/* eslint-disable react-hooks/exhaustive-deps */
import "./CardView.css";
import { useParams, useLocation } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";
import CloseIcon from "@mui/icons-material/Close";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import { useEffect, useState } from "react";
import ChecklistView from "./ChecklistView";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";

import axios from "axios";

function CardView() {
  let { id2 } = useParams();
  var { state } = useLocation();
  // console.log(state.element); //card data array
  // console.log(state.element2); //list name

  const [open, setOpen] = useState(false);
  const [checklistData, setChecklistdata] = useState([]);
  const [inputval, setInputval] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [placement, setPlacement] = useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const updateChecklist = (id) => {
    var ans = checklistData.filter((ele) => ele.id != id);
    setChecklistdata(ans);
  };

  const createChecklist = () => {
    axios
      .post(
        `https://api.trello.com/1/cards/${id2}/checklists?name=${inputval}&key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`
      )
      .then((data) => {
        setChecklistdata([...checklistData, data.data]);
        setOpen(false);
        setInputval("");
      })
      .catch((err) => {
        console.log(err);
        setOpen(false);
        setInputval("");
        alert("Couldn't create the checklist");
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/cards/${id2}/checklists?key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`
      )
      .then((data) => {
        setChecklistdata(data.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Couldn't fetch checklist due to some error...");
      });
  }, []);

  return (
    <div className="wrap-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexFlow: "row wrap",
        }}
      >
        <div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div>
              <PaymentIcon />
            </div>
            <div>
              {state.element.map((card) => {
                return card.id == id2 ? <h3>{card.name}</h3> : null;
              })}
            </div>
          </div>
          <small
            style={{ padding: "3px", marginLeft: "33px" }}
          >{`in list ${state.element2}`}</small>
        </div>
        <div>
          <CloseIcon />
        </div>
      </div>
      <div className="block2">
        <div className="wrap-2">
          <div style={{ paddingBottom: "50px" }}>
            <b>
              {" "}
              <DomainVerificationIcon
                sx={{ position: "relative", top: "6px" }}
              />
              <span style={{ paddingLeft: "5px" }}>Checklist</span>
            </b>
          </div>
          <div>
            <Box sx={{ width: 500 }}>
              <Popper
                sx={{ zIndex: 1200 }}
                open={open}
                anchorEl={anchorEl}
                placement={placement}
                transition
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                      <Typography
                        sx={{ p: 1, width: "200px", minHeight: "30px" }}
                      >
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            createChecklist();
                          }}
                          style={{ width: "80%", margin: "auto" }}
                        >
                          <input
                            type="text"
                            value={inputval}
                            onChange={(e) => {
                              setInputval(e.target.value);
                            }}
                            placeholder="title"
                            required
                          />
                          <button
                            style={{
                              margin: "auto",
                              display: "block",
                              width: "40px",
                              backgroundColor: "#1976d2",
                              color: "white",
                              marginTop: "10px",
                              padding: "2px",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                            type="submit"
                          >
                            Add
                          </button>
                        </form>
                      </Typography>
                    </Paper>
                  </Fade>
                )}
              </Popper>

              <Grid container justifyContent="right">
                <Grid item xs={3}>
                  <Button onClick={handleClick("left-start")}>Add-list</Button>
                  <br />
                </Grid>
              </Grid>
              <br />
              <br />
            </Box>
          </div>
        </div>
        {checklistData.map((ele) => {
          return (
            <ChecklistView
              data={ele}
              key={ele.id}
              updateChecklist={updateChecklist}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CardView;
