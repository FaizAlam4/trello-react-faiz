import "./BoardSection.css";
import { useEffect, useState } from "react";
import axios from "axios";
import BoardLayout from "./BoardLayout";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Logo from "../assets/formLogo.svg";
// import Popper from "@mui/material/Popper";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

function BoardSection() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

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
    axios
      .get(
        "https://api.trello.com/1/members/me/boards?key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D"
      )
      .then((data) => data.data)
      .then((res) => {
        setData(res);
        setLoad(false);
      });
  }, []);

  const [inp, setInp] = useState("");

  let handleInput = (e) => {
    setInp(e.target.value);
  };

  let handleForm = (e) => {
    axios
      .post(
        `https://api.trello.com/1/boards/?name=${e}&key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`
      )
      .then((res) => {
        setData((value) => [...value, res.data]);
        setOpen(false)
      })
      .catch(() => {
        alert("Couldn't create board!");
        setOpen(false)
      });
  };

  if (load == true) {
    return <div className="load">Loading...</div>;
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
          <Button onClick={handleOpen}>
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
                sx={{ display: "block" }}
                variant="caption"
                component="caption"
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
                  />

                  <button className="btn">Create</button>
                </form>
              </div>
            </Box>
          </Modal>
        </div>

        {data.map((board, index) => (
          <BoardLayout key={index} id={board.id} data={board} />
        ))}
      </div>
    </>
  );
}

export default BoardSection;
