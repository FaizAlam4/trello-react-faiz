/* eslint-disable react/prop-types */
import Grid from '@mui/material/Grid'

function BoardLayOut({data}) {
  return (
    <Grid item xs={3.7} sx={{height:'150px',width:'80px',margin:'10px', background:`linear-gradient(${data.prefs.backgroundTopColor},${data.prefs.backgroundBottomColor})`, borderRadius:'5px',fontWeight:'bold', fontSize:'1.2rem', color:'white'}}>{data.name}</Grid>
  )
}


export default BoardLayOut