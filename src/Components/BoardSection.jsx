import "./BoardSection.css";
import { useEffect, useState } from "react";
import axios from "axios";
import BoardLayOut from "./BoardLayOut";
import Box from "@mui/material/Box";
import Logo from "../assets/formLogo.svg";
import Popper from "@mui/material/Popper";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

function BoardSection() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  // const [form, setForm] = useState(false);

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
        console.log(res);
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
        setAnchorEl(null);
      })
      .catch(() => {
        alert("Couldn't create board!");
        setAnchorEl(null);
      });
  };

  if (load == true) {
    return <div className="load">Loading...</div>;
  }

  return (
    <>
      <Container sx={{ width: "100vw", display: "relative" }}>
        <Grid
          container
          spacing={3}
          sx={{
            width: "100%",
            paddingTop: "70px",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "1.2rem",
                backgroundColor: "#091e420f",
                color: "#172b4d",
                textAlign: "center",
                lineHeight: "4rem",
                borderRadius: "5px",
                width: "350px",
                height: "150px",
                marginTop: "10px",
                marginLeft: "8px",
              }}
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
                />
              </Typography>
            </div>
            <Popper id={id} open={open} anchorEl={anchorEl}>
              <Box sx={{ border: 1, p: 1, bgcolor: "white" }}>
                <div className="form">
                  <img className="ig" src={Logo} alt="" />
                  <label
                    style={{
                      marginTop: "70px",
                      display: "block",
                      padding: "15px",
                    }}
                  >
                    Board Title <small style={{ color: "red" }}>*</small>
                  </label>
                  <input type="text" value={inp} onChange={handleInput} />

                  <button
                    onClick={() => {
                      handleForm(inp);
                    }}
                    className="btn"
                  >
                    Create
                  </button>
                </div>
              </Box>
            </Popper>
          </div>

          {data.map((board, index) => (
            <BoardLayOut key={index} id={board.id} data={board} />
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default BoardSection;
