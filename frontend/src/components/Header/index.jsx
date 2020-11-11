import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainTitle: {
      margin: "24px 0",
    },
    mainText: {
        margin: "12px 0",
        
    },
}));

function Header({ title, text1 }) {
  const classes = useStyles();
  return (
    <Paper>
      <Container style={{ height: "40vh" }}>
        <Grid container>
          <Grid item md={6} className={classes.mainTitle}>
            <Typography variant="h2">{title}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={6} className={classes.mainText}>
            <Typography variant="body1">{text1}</Typography>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}

export default Header;
