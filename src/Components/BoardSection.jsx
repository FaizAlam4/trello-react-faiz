import "./BoardSection.css";
import { useEffect, useState } from "react";
import BoardLayout from "./BoardLayout";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Logo from "../assets/formLogo.svg";
import CircularProgress from "@mui/material/CircularProgress";
import BasicAlerts from "./ErrorComponent";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import apiService from "../API/api";

function BoardSection() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(false);
  const [opend, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  useEffect(() => {
    apiService.get("members/me/boards?").then((res) => {
      setData(res);
      setLoad(false);
    });
  }, []);

  const [inp, setInp] = useState("");

  let handleInput = (e) => {
    setInp(e.target.value);
  };

  let handleForm = (e) => {
    apiService
      .post(`boards/?name=${e}&`)
      .then((res) => {
        setData((value) => [...value, res]);
        setOpen(false);
      })
      .catch(() => {
        setError(true);
        setOpen(false);
      });
  };

  if (load == true) {
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
      <div
        style={{
          width: "90%",
          display: "flex",
          flexFlow: "row wrap",
          paddingTop: "40px",
          justifyContent: "start",
          margin: "auto",
          gap: "55px",
          marginLeft: "9vw",
        }}
      >
        <div>
          <Button onClick={handleOpen} disableRipple>
            {" "}
            <div
              style={{
                fontSize: "1.2rem",
                backgroundColor: "#091e420f",
                color: "#172b4d",
                textAlign: "center",
                lineHeight: "4rem",
                borderRadius: "5px",
                width: "340px",
                height: "150px",
                padding: "20px",
                marginTop: "5px",
                marginLeft: "8px",
              }}
              className="modal-btn"
              aria-describedby={id}
              type="button"
              onClick={handleClick}
            >
              Create new board
              <Typography
                sx={{ display: "block" , fontWeight:'200',fontSize:'1rem'}}
                variant="h6"
                component="h6"
              >
                remaining {10 - data.length}
                <HelpOutlineOutlinedIcon
                  sx={{
                    fontSize: "1rem",
                    display: "block",
                    marginTop: "13px",
                    marginLeft: "260px",
                  }}
                  className="icn"
                />
              </Typography>
            </div>
          </Button>

          <Modal
            open={opend}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <div className="form">
                <img className="ig" src={Logo} alt="" />
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleForm(inp);
                  }}
                >
                  <label
                    style={{
                      marginTop: "70px",
                      display: "block",
                      padding: "15px",
                    }}
                  >
                    Board Title <small style={{ color: "red" }}>*</small>
                  </label>
                  <input
                    type="text"
                    value={inp}
                    onChange={handleInput}
                    required
                    autoFocus='open'
                  />

                  <button className="btn">Create</button>
                </form>
              </div>
            </Box>
          </Modal>
        </div>
        {error ? <BasicAlerts /> : null}
<div style={{display:'flex',flexFlow:'row wrap',gap:'30px'}}>

        {data.map((board, index) => (
          <BoardLayout key={index} id={board.id} data={board} />
        ))}
</div>
      </div>
    </>
  );
}

export default BoardSection;
