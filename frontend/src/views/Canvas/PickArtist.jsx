import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import CarouselShowcase from "../../components/Carousel"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paperContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  paper: {
    minHeight: "400px",
    padding: theme.spacing(5),
  },
}));
function PickArtist({ styles, artistList, artist, handleArtistChange }) {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} spacing={3} className={classes.paperContainer}>
        <Paper className={classes.paper}>
          {/* <Typography variant={"h2"} gutterBottom>
        1. Pick a style
      </Typography> */}
          <FormControl className={classes.formControl}>
            <InputLabel id="artist-select">Pick one Artist</InputLabel>
            <Select
              labelId="artist-select"
              id="artist-select"
              value={artist}
              onChange={handleArtistChange}
            >
              {artistList.map((artist, i) => (
                <MenuItem value={artist.name} key={i}>
                  {artist.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <CarouselShowcase />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Typography variant={"h6"} gutterBottom>
          This is the base style to transfer to your picture.
        </Typography>
      </Grid>
    </>
  );
}

export default PickArtist;
