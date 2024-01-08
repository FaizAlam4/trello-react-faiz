import "./BoardSection.css";
import { useEffect, useState } from "react";
import axios from "axios";
import BoardLayOut from "./BoardLayOut";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import FormComponent from "./FormComponent";
import Typography from "@mui/material/Typography";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

function BoardSection() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [form, setForm] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://api.trello.com/1/members/me/boards?key=688828938a0a81fbaff1c76c5dfa1577&token=ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D"
      )
      .then((data) => data.data)
      .then((res) => {
        setData(res);
        console.log(res);
        setLoad(false);
      });
  }, []);


  let handleBoard = () => {
setForm((prev)=>!prev)

  };

  if(load==true){
    return (<div className="load">Loading...</div>)
  }

  return (
    <>
      <div>
        <Container sx={{ width: "100vw", display:'relative' }}>
          <Grid
            container
            spacing={3}
            sx={{
              width: "100%",
              paddingTop: "70px",
              justifyContent: "space-between",
            }}
          >
            <Grid
              item
              xs={3.7}
              sx={{
                fontSize: "1.2rem",
                backgroundColor: "#091e420f",
                color: "#172b4d",
                textAlign: "center",
                lineHeight: "4rem",
                borderRadius: "5px",
                width: "80px",
                height: "150px",
                marginTop: "10px",
                marginLeft: "8px",
              }}
              onClick={handleBoard}
            >
              {" "}
              Create new board
              <Typography
                sx={{ display: "block" }}
                variant="caption"
                component="caption"
              >
                5 remaining
                <HelpOutlineOutlinedIcon
                  sx={{
                    fontSize: "1rem",
                    display: "block",
                    marginTop: "13px",
                    marginLeft: "260px",
                  }}
                />
              </Typography>
            </Grid>
            {data.map((board, index) => (
              <BoardLayOut key={index} id={board.id} data={board} />
            ))}
          </Grid>
          {form && <FormComponent func={setForm} />}
        </Container>
      </div>
    </>
  );
}

export default BoardSection;
