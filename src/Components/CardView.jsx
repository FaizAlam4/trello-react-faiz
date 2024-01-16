/* eslint-disable react-hooks/exhaustive-deps */
import "./CardView.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";
import CloseIcon from "@mui/icons-material/Close";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import { useEffect, useReducer } from "react";
import ChecklistView from "./ChecklistView";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import BasicAlerts from "./ErrorComponent";
import apiService from "../API/api";
import { CircularProgress } from "@mui/material";
import reducer from "../Reducer/reducer.js";
import * as actionTypes from "../Reducer/actionType.js";

function CardView() {
  const navigate = useNavigate();

  let { id2 } = useParams();
  var { state } = useLocation();
  // console.log(state.element); //card data array
  // console.log(state.element2); //list name

  const initialState = {
    open: false,
    checklistData: [],
    inputval: "",
    anchorEl: null,
    placement: undefined,
    load: true,
    err: false,
  };

  const [currentState, dispatch] = useReducer(reducer, initialState);

  const handleClick = (newPlacement) => (event) => {
    dispatch({ type: actionTypes.SET_ANCHOR_EL, payload: event.currentTarget });
    dispatch({
      type: actionTypes.TOGGLE_OPEN,
      payload: newPlacement !== currentState.placement || !currentState.open,
    });
    dispatch({ type: actionTypes.SET_PLACEMENT, payload: newPlacement });
  };

  const updateChecklist = (id) => {
    var ans = currentState.checklistData.filter((ele) => ele.id != id);
    dispatch({ type: actionTypes.SET_CHECKLIST_DATA, payload: ans });
  };
  const goBack = (path) => {
    navigate(path);
  };

  const createChecklist = () => {
    apiService
      .post(`cards/${id2}/checklists?name=${currentState.inputval}&`)
      .then((data) => {
        dispatch({
          type: actionTypes.SET_CHECKLIST_DATA,
          payload: [...currentState.checklistData, data],
        });
        dispatch({ type: actionTypes.TOGGLE_OPEN, payload: false });
        dispatch({ type: actionTypes.SET_INPUT_VALUE, payload: "" });
        dispatch({ type: actionTypes.SET_ERROR, payload: false });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: actionTypes.TOGGLE_OPEN, payload: false });
        dispatch({ type: actionTypes.SET_INPUT_VALUE, payload: "" });
        dispatch({ type: actionTypes.SET_ERROR, payload: true });
      });
  };

  useEffect(() => {
    apiService
      .get(`cards/${id2}/checklists?`)
      .then((data) => {
        dispatch({ type: actionTypes.SET_CHECKLIST_DATA, payload: data });
        dispatch({ type: actionTypes.SET_LOAD, payload: false });
      })
      .catch((err) => console.log(err));
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
              {state.element.map((card, index) => {
                return card.id == id2 ? <h3 key={index}>{card.name}</h3> : null;
              })}
            </div>
          </div>
          <small
            style={{ padding: "3px", marginLeft: "33px" }}
          >{`in list ${state.element2}`}</small>
        </div>
        <div>
          <CloseIcon
            sx={{ cursor: "pointer", backgroundColor: "#f0ecec" }}
            onClick={() => {
              goBack(`/${state.element3}`);
            }}
          />
        </div>
      </div>
      <div className="block2">
        <div className="wrap-2">
          <div
            style={{
              marginBottom: "20px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              padding: "5px",
              borderRadius: "5px",
              paddingBottom: "12px",
            }}
          >
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
                open={currentState.open}
                anchorEl={currentState.anchorEl}
                placement={currentState.placement}
                transition
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                      <Typography
                        variant="body"
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
                            value={currentState.inputval}
                            onChange={(e) => {
                              dispatch({
                                type: actionTypes.SET_INPUT_VALUE,
                                payload: e.target.value,
                              });
                            }}
                            placeholder="title"
                            required
                            autoFocus="open"
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

              <Grid
                container
                sx={{ justifyContent: "center", paddingLeft: "40px" }}
              >
                <Grid item xs={3}>
                  <Button onClick={handleClick("bottom")}>Add-list</Button>
                  <br />
                </Grid>
              </Grid>
              <br />
              <br />
            </Box>
          </div>
        </div>
        {currentState.err ? <BasicAlerts /> : null}
        {currentState.load ? (
          <div>
            <CircularProgress
              sx={{ fontSize: "5rem", display: "block", margin: "auto" }}
            />
          </div>
        ) : (
          currentState.checklistData.map((ele) => {
            return (
              <ChecklistView
                data={ele}
                key={ele.id}
                updateChecklist={updateChecklist}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default CardView;
