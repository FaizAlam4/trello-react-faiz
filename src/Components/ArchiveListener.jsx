/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import "./ArchiveListener.css";
import axios from "axios";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function ArchiveListener({ data,updateData}) {
  const [open, setOpen] = React.useState(false);

  let archiveEndPoint = `https://api.trello.com/1/lists/${data.id}/?closed=true&key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`;

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  let handleOptions = (e) => {
    if (e.target.innerText == "Archive") {
      axios
        .put(archiveEndPoint)
        .then((mydata) => {
         updateData(data)
          console.log(mydata);

        })
        .catch((err) => {
          console.log(err);
          alert("Couldn't archive the card");
        });
    }
  };

  const styles = {
    position: "absolute",
    top: 28,
    cursor:'pointer',
    right: 0,
    left: 0,
    zIndex: 1,
    border: "1px solid",
    p: 1,
    bgcolor: "background.paper",
    width: "fit-content",
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        sx={{ position: "relative", fontSize: "small", width: "fit-content" }}
      >
        <button type="button" onClick={handleClick} style={{border:'none',cursor:'pointer'}}>
          <MoreHorizIcon/>
        </button>
        {open ? (
          <Box sx={styles}>
            <ul
              className="options"
              onClick={(e) => {
                handleOptions(e);
              }}
            >
              <li>Archive</li>
            </ul>
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
}
