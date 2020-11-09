import React from "react";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    minHeight: "200px",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    img: {
      maxHeight: "300px",
    },
  },
  ratingPaper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "12px",
    padding: "12px"
  }
}));

function StyledPhoto({ handleRatingChange, imgURL }) {
  const classes = useStyles();
  return (
    <>
      <Grid item xs className={classes.paperContainer}>
        <Paper className={classes.paper}>
          {!imgURL ? (
            <CircularProgress />
          ) : (
            <img
              // style={{ display: "none" }}
              src={imgURL}
              alt={"Monet"}
            />
          )}
        </Paper>
      </Grid>
      {!imgURL ? null : (
        <>
          <Grid item xs={12} >
            <Paper className={classes.ratingPaper} >
              <Grid item xs={12}>
                <Box component="fieldset" borderColor="transparent">
                  <Rating
                    name="rating"
                    defaultValue={3}
                    precision={1}
                    onChange={handleRatingChange}
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  />
                </Box>
              </Grid>
            </Paper>
            <Grid item xs={12}>
              <Typography variant={"h6"} gutterBottom>
                Are you satisfied with the result? Rate it to improve our model.
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default StyledPhoto;
