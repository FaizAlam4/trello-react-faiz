/* eslint-disable react/prop-types */
import "./ArchiveListener.css";
import ArchiveIcon from "@mui/icons-material/Archive";
import apiService from "../API/api";
import { useDispatch} from "react-redux";
import { updateList } from "../feature/listSlice";

export default function ArchiveListener({ data}) {
  let archiveEndPoint = `lists/${data.id}/?closed=true&`;

  const dispatch=useDispatch()
  let handleOptions = () => {
    apiService
      .put(archiveEndPoint)
      .then((myData) => {


        dispatch(updateList(data))
        console.log(myData);
      })
      .catch((err) => {
        console.log("this is ", err);
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
