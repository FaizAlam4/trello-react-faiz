/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import CheckIcon from "@mui/icons-material/Check";
import LinearProgress from "@mui/material/LinearProgress";
import "./ChecklistView.css";
import axios from "axios";
import { useEffect, useState } from "react";

function ChecklistView({ data }) {
  const [checkItem, setCheckitem] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/checklists/${data.id}/checkItems?key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`
      )
      .then((res) => {
        console.log(res.data);
        setCheckitem(res.data);
      });
  }, []);

  const createCheckitems = (data) => {
axios.post(`https://api.trello.com/1/checklists/${data.id}/checkItems?name=${data.name}&key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`).then((res)=>{
  setCheckitem([...checkItem,res.data])

}).catch((err)=>{
  console.log(err)
})
  };

  return (
    <div className="chk-wrap">
      <CheckIcon sx={{ paddingTop: "5px" }} /> {data.name}
      <div>
        <LinearProgress
          variant="determinate"
          value={0}
          sx={{ marginTop: "10px" }}
        />
      </div>
      {checkItem.map((item) => {
        return (
          <>
            <input className="checkitm" type="checkbox" />
            <label style={{ padding: "10px" }}>{item.name}</label>

            <br />
          </>
        );
      })}
      <div>
        <button
          style={{
            border: "none",
            borderRadius: "4px",
            padding: "5px",
            marginTop: "16px",
          }}
          onClick={() => {
            createCheckitems(data);
          }}
        >
          Add an item
        </button>
      </div>
    </div>
  );
}

export default ChecklistView;
