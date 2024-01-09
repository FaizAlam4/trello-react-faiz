/* eslint-disable react/prop-types */
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
function BoardLayOut({ data }) {
  return (
  <div
      style={{
        height: "150px",
        width: "350px",
        margin: "10px",
        background: `linear-gradient(${data.prefs.backgroundTopColor},${data.prefs.backgroundBottomColor})`,
        borderRadius: "5px",
        fontWeight: "bold",
        padding:'10px',
        fontSize: "1.2rem",
        color: "white",
      }}
    >
      <Link
        to={`/${data.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div style={{ width: "300px", height: "100px" }}>{data.name}</div>
      </Link>
    </div>
  );
}

export default BoardLayOut;
