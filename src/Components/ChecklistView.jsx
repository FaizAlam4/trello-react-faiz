/* eslint-disable react/prop-types */
// import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import LinearProgress from '@mui/material/LinearProgress';
import "./ChecklistView.css";

function ChecklistView({ data }) {
  return <div className="chk-wrap">
  <CheckIcon sx={{paddingTop:'5px'}}/>  {data.name} 
  <div>
<LinearProgress variant="determinate"
      value={0} sx={{marginTop:'10px'}}/>
  </div>
  <div>
   
  </div>
    </div>;
}

export default ChecklistView;
