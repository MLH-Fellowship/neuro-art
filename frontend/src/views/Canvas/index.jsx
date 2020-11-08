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
import ImageUploader from "react-images-upload";
import { Paper } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Box from "@material-ui/core/Box";

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
  const [picture, setPicture] = useState([]);
  const [rating, setRating] = useState(0);

  const handleArtistChange = (event) => {
    setArtist(event.target.value);
  };

  const onDrop = (pictureFiles, pictureDataURLs) => {
    setPicture((prevPics) => [...prevPics, ...pictureFiles]);
  };
 
  const handleRatingChange = (event , value) => {
    setRating(value);
  }
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
          <Grid item xs={8}>
            <Typography variant={"h2"} gutterBottom>
              2. Upload your photo
            </Typography>
            <div>
              <ImageUploader
                withIcon={true}
                buttonText="Choose images"
                onChange={onDrop}
                imgExtension={[".jpg", ".png"]}
                singleImage
                withPreview
                maxFileSize={5242880}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Typography variant={"h2"} gutterBottom>
              3. Become an artist
            </Typography>
            <Paper>
              <img
                // style={{ display: "none" }}
                src={
                  "https://www.latercera.com/resizer/kHLHjR6u3jIRC7-xl_1oXBzxWUE=/800x0/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/MEP3EKODIVGKPDXNMGNLB6ZN3A.jpg"
                }
                alt={"Monet"}
              />
            </Paper>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating
                name="rating"
                defaultValue={2}
                precision={1}
                onChange={handleRatingChange}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Canvas;
