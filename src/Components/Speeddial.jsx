/* eslint-disable react/prop-types */
// import * as React from 'react';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import ListIcon from "@mui/icons-material/List";

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

const deleteChecklist = (data, setErr, updateCardData) => {
  console.log(data.id);
  axios
    .delete(
      `https://api.trello.com/1/cards/${data.id}?key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D`
    )
    .then(() => {
      console.log("successfully deleted!");
      updateCardData();
    })
    .catch((err) => {
      console.log(err);
      setErr(true);
    });
};

const actions = [
  {
    icon: <DeleteIcon sx={{ fontSize: "2rem" }} />,
    name: "Delete",
  },
  //   { icon: <SaveIcon />, name: 'Save' },
];

export default function Speeddial({ data, updateCardData, setErr }) {
  return (
    <Box
      sx={{
        transform: "translateZ(0px)",
        flexGrow: 1,
        position: "relative",
        top: -84,
        mt: 2,
        left: 195,
        zIndex: 0,
      }}
      fontSize="0.3rem"
    >
      <Box sx={{ position: "absolute", height: 2 }}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          sx={{ transform: "scale(0.5)" }}
          hidden={false}
          icon={<ListIcon />}
          direction="right"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={
                <DeleteIcon
                  sx={{ fontSize: "2.7rem" }}
                  onClick={() => {
                    deleteChecklist(data, setErr, () => {
                      updateCardData(data.id);
                    });
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
