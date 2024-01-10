/* eslint-disable react-hooks/exhaustive-deps */
import "./CardView.css";
import { useParams, useLocation } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";
import CloseIcon from "@mui/icons-material/Close";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import { useEffect, useState } from "react";
import ChecklistView from "./ChecklistView";
import Box from '@mui/material/Box';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";

function CardView() {
  let { id2 } = useParams();
  var { state } = useLocation();
  // console.log(state.element); //card data array
  // console.log(state.element2); //list name

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const createChecklist=()=>{
    axios.post(`https://api.trello.com/1/cards/${id2}/checklists?name=${inputval}&key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`).then((data)=>{
     setChecklistdata([...checklistData,data.data])
     setOpen(false)

    }).catch((err)=>{
      console.log(err)
      setOpen(false)
      alert("Couldn't create the checklist")
    })
  }

  const styles = {
    position: 'absolute',
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    width:'180px',
    border: 'none',
    p: 2,
    bgcolor: 'background.paper',
    fontWeight:'400',
    fontSize:'1rem',
    borderRadius:'5px',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px'

  };


  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/cards/${id2}/checklists?key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`
      )
      .then((data) => {
        setChecklistdata(data.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Couldn't fetch checklist due to some error...");
      });
  }, []);

  const [checklistData, setChecklistdata] = useState([]);
  const [inputval,setInputval]=useState('')

  return (
    <div className="wrap-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexFlow: "row wrap",
        }}
      >
        <div>
          <div style={{ display: "flex", gap: "20px" }}>
            <div>
              <PaymentIcon />
            </div>
            <div>
              {state.element.map((card) => {
                return card.id == id2 ? <h3>{card.name}</h3> : null;
              })}
            </div>
          </div>
          <small
            style={{ padding: "3px",marginLeft:'40px' }}
          >{`in list ${state.element2}`}</small>
        </div>
        <div>
          <CloseIcon />
        </div>
      </div>
      <div className="block2">
        <b>
          {" "}
          <DomainVerificationIcon sx={{ position: "relative", top: "6px" }} />
          Checklist 
          <ClickAwayListener onClickAway={handleClickAway}>
  <Box sx={{ position: 'relative' ,float:'right'}}>
    <button type="button" style={{backgroundColor:'#5252ff'}} onClick={handleClick}>
      <AddIcon sx={{backgroundColor:'#5252ff',color:'white',padding:'0px'}}/>
    </button>
    {open ? (
      <Box sx={styles}>
        <legend>
<small style={{color:'grey',paddingLeft:'8px'}}>Add a checklist</small>
       <form  onSubmit={(e)=>{e.preventDefault();
      createChecklist();
      }}>
        <input type="text" placeholder="title" value={inputval} onChange={(e)=>{setInputval(e.target.value)}} required/>
        <button style={{padding:'5px',minWidth:'20px',margin:'auto',display:'block',marginTop:'10px',  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',border:'none',backgroundColor:'#5252ff',color:'white', borderRadius:'2px'}} type="submit">Add</button>
       </form>
        </legend>
      </Box>
    ) : null}
  </Box>
</ClickAwayListener>
        </b>
        {checklistData.map((ele)=>{
       return (<ChecklistView data={ele} key={ele.id}/>)
        })}
      </div>
    </div>
  );
}

export default CardView;
