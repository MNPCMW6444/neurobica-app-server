import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import "../../assets/fonts.css";
import UserVisualData from "../UserVisualData/UserVisualData";
import UserVisualDataRadar from "../UserVisualDataRadar/UserVisualDataRadar";

export default function Home() {
  return (
    <Grid
      container
      spacing={{ xs: 0, md: 0 }}
      columns={{ xs: 0, md: 2 }}
      paddingTop="7vh"
      paddingLeft="2vh"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item m={4} xs={4} sx={{ margin: "0" }}>
        <Typography
          sx={{
            color: "#FFE1D4",
            WebkitTextStroke: "1px #FF8B17",
            textShadow: "2px 2px",
            fontFamily: "arial, Verdana, Sans-serif",
            margin: "0",
          }}
          variant="h4"
          gutterBottom
        >
          Hello, Ready To Train?
        </Typography>
      </Grid>
      <Grid item m={4} xs={4} sx={{}} >
        <Button
          color="inherit"
          variant="outlined"
          sx={{
            color: "#FF8B17",
            width: "55vh",
            height: "8vh",
            fontSize: "3vh",
            borderRadius: "30px",
            margin: "0",

          }}
        >
          +
        </Button>
      </Grid>
      <Grid item m={2} xs={2} sx={{ width: "100vh" }}>
        <UserVisualDataRadar />
      </Grid>
      <Grid item m={2} xs={2} sx={{ width: "100vh" }}>
        <UserVisualData />
      </Grid>
    </Grid>
  );
}
