import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import ListView from "./ListView";
import "./ListDisplay.css";
import AddIcon from "@mui/icons-material/Add";

function ListDisplay() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };
  
    const open = Boolean(anchorEl);
    const ide = open ? 'simple-popper' : undefined;
  const [res, setRes] = useState([]);
//   const [showmodal,setShowModal]=useState(false)
  const [listLoad, setlistLoad] = useState(true);

  const { id } = useParams();



  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/boards/${id}/lists?key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`
      )
      .then((data) => data.data)
      .then((result) => {
        setRes(result);
        setlistLoad(false);
      })
      .catch(() => {
        console.log("Error occured...");
      });
  }, []);

  if (listLoad) {
    return (
      <div
        style={{
          fontSize: "2rem",
          width: "600px",
          margin: "auto",
          fontWeight: "bold",
          marginTop: "30vh",
          color: "grey",
        }}
      >
        Loading list items......
      </div>
    );
  }

  return (
    <div className="wrap-flex">
      {res.map((element) => (
        <ListView key={element.id} element={element} />
      ))}

      <Link style={{textDecoration:'none', color:'inherit'}} onClick={handleClick}>
        <div className="wrap-item-fix">
          <div>
            {" "}
            <AddIcon sx={{ paddingRight: "5px" }} />{" "}
          </div>{" "}
          <div aria-describedby={ide} type="button" >
  Add another list
</div>
<Popper id={ide} open={open} anchorEl={anchorEl}>
  <Box sx={{ border: 1, p: 1, bgcolor: 'white', }}>
<input type="text" placeholder=".. Add list title" />
<br />

  </Box>
</Popper>
        </div>
      </Link>
    </div>
  );
}

export default ListDisplay;
