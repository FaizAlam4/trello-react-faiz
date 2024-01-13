/* eslint-disable react/prop-types */
// import * as React from 'react';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DeleteIcon from "@mui/icons-material/Delete";
import apiService from "../API/api";
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
  apiService
    .delete(`cards/${data.id}?`)
    .then(() => {
      updateCardData();
      setErr(false)
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
        top: -37,
        mt: 2,
        left: -84,
        zIndex: 0,
      }}
      fontSize="0.3rem"
    >
      <Box sx={{ position: "absolute" }}>
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
                  sx={{ fontSize: "2.7rem", color: "red" }}
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
