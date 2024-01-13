/* eslint-disable react/prop-types */
import "./ArchiveListener.css";
import ArchiveIcon from "@mui/icons-material/Archive";
import apiService from "../API/api";

export default function ArchiveListener({ data, updateData, setErr }) {
  let archiveEndPoint = `lists/${data.id}/?closed=true&`;

  let handleOptions = () => {
    apiService
      .put(archiveEndPoint)
      .then((myData) => {
        updateData(data);
        console.log(myData);
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
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
