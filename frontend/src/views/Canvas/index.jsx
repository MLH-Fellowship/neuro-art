import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const artistList = ["Monet", "Picasso", "Van Gogh"];

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Canvas() {
  const classes = useStyles();
  const [artist, setArtist] = useState(artistList[0]);

  const handleArtistChange = (event) => {
    setArtist(event.target.value);
  };
  return (
    <>
      <Navbar />
      <Container>
        {/* TODO: Make separate components out of each */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant={"h2"} gutterBottom>
              1. Pick a style
            </Typography>
            <FormControl className={classes.formControl}>
              <InputLabel id="artist-select">Pick one Artist</InputLabel>
              <Select
                labelId="artist-select"
                id="artist-select"
                value={artist}
                onChange={handleArtistChange}
              >
                {artistList.map((artist, i) => (
                  <MenuItem value={artist} key={i}>
                    {artist}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant={"h2"} gutterBottom>
             2. Upload your photo
            </Typography>
           
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Canvas;
