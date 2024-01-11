/* eslint-disable react/prop-types */
import "./ArchiveListener.css";
import axios from "axios";

import ArchiveIcon from "@mui/icons-material/Archive";

export default function ArchiveListener({ data, updateData }) {
  let archiveEndPoint = `https://api.trello.com/1/lists/${data.id}/?closed=true&key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`;

  let handleOptions = () => {
    axios
      .put(archiveEndPoint)
      .then((mydata) => {
        updateData(data);
        console.log(mydata);
      })
      .catch((err) => {
        console.log(err);
        alert("Couldn't archive the card");
      });
  };

  return (
    <button
      style={{ cursor: "pointer", border: "none" }}
      onClick={() => {
        handleOptions();
      }}
    >
      <ArchiveIcon fontSize="small" className="archive" />
    </button>
  );
}
