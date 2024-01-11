/* eslint-disable react/prop-types */
// import * as React from 'react';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const deleteChecklist = (data,updateCardData) => {
    console.log(data.id)
  axios
    .delete(
      `https://api.trello.com/1/cards/${data.id}?key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`
    )
    .then(() => {
      console.log("successfully deleted!");
      updateCardData()
    })
    .catch((err) => {
      console.log(err);
  
    });
};

const actions = [
  {
    icon: (
      <DeleteIcon
        sx={{ fontSize: "2rem" }}
      />
    ),
    name: "Delete",
  },
  //   { icon: <SaveIcon />, name: 'Save' },
];

export default function Speeddial({ data, updateCardData }) {
    // console.log(data.id)
  return (
    <Box
      sx={{
        transform: "translateZ(0px)",
        flexGrow: 1,
        position: "relative",
        top: -79,
        mt: 2,
        left: 195,
        zIndex: 3,
        fontSize: "0.2rem",
      }}
      fontSize="0.3rem"
    >
      <Box sx={{ position: "absolute", height: 2 }}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          sx={{ transform: "scale(0.6)" }}
          hidden={false}
          icon={<SpeedDialIcon />}
          direction="right"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={
                <DeleteIcon
                  sx={{ fontSize: "2rem" }}
                  onClick={() => {
                    deleteChecklist(data,()=>{updateCardData(data.id)});
                  }}
                />
              }
              tooltipTitle={action.name}
            />
          ))}
        </StyledSpeedDial>
      </Box>
    </Box>
  );
}
