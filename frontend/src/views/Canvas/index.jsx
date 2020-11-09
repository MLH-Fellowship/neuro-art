import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PickArtist from "./PickArtist";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import ImageUploader from "react-images-upload";
import { Paper } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";

const artistList = ["Monet", "Picasso", "Van Gogh"];

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
}));

function getSteps() {
  return ["Pick a style to apply", "Upload your image", "Become an artist"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "This is the base style to transfer to your picture.";
    case 1:
      return "Give your best shot a try";
    case 2:
      return "Are you satisfied with the resul? Rate it to improve our model.";
    default:
      return "Unknown stepIndex";
  }
}

function Canvas() {
  // Styles Hook
  const classes = useStyles();
  // Local State utilities
  const [artist, setArtist] = useState(artistList[0]);
  const [picture, setPicture] = useState([]);
  const [rating, setRating] = useState(0);

  // OnChange Controllers for Local State
  const handleArtistChange = (event) => {
    setArtist(event.target.value);
  };
  const onDrop = (pictureFiles, pictureDataURLs) => {
    setPicture((prevPics) => [...prevPics, ...pictureFiles]);
  };
  const handleRatingChange = (event, value) => {
    setRating(value);
  };

  // Stepper Component
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Navbar />
      <Container>
        {/* TODO: Make separate components out of each */}
        <Grid container spacing={3}>
          <Grid item md={12}>
            <div className={classes.root}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <div>
                {activeStep === steps.length ? (
                  <div>
                    <Typography className={classes.instructions}>
                      Don't forget to share!
                    </Typography>
                    <Button onClick={handleReset}>Reset</Button>
                  </div>
                ) : (
                  <div>
                    <Typography className={classes.instructions}>
                      {getStepContent(activeStep)}
                    </Typography>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
        <PickArtist
          style={classes}
          artistList={artistList}
          artist={artist}
          handleArtistChange={handleArtistChange}
        />
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
