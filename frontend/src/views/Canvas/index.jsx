import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PickArtist from "./PickArtist";
import UploadPhoto from "./UploadPhoto";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import StyledPhoto from "./StyledPhoto";

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
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <>
            {" "}
            <PickArtist
              style={classes}
              artistList={artistList}
              artist={artist}
              handleArtistChange={handleArtistChange}
            />
            <Typography variant={"h6"} gutterBottom>
              This is the base style to transfer to your picture.
            </Typography>
          </>
        );
      case 1:
        return (
          <>
            {" "}
            <UploadPhoto onDrop={onDrop} />
            <Typography variant={"h6"} gutterBottom>
              Give your best shot a try
            </Typography>
          </>
        );
      case 2:
        return (
          <>
            <StyledPhoto handleRatingChange={handleRatingChange} />
            <Typography variant={"h6"} gutterBottom>
              Are you satisfied with the resul? Rate it to improve our model.
            </Typography>
          </>
        );
      default:
        return "Unknown stepIndex";
    }
  }
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
              <Grid
                container
                style={{ height: "100%", textAlign: "center" }}
              ></Grid>
              <div>
                {activeStep === steps.length ? (
                  <div>
                    <Typography className={classes.instructions}>
                      Don't forget to share!
                    </Typography>
                    <Button onClick={handleReset}>Try again</Button>
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
                        {activeStep === steps.length - 1 ? "Send Rating" : "Next"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={3}></Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Canvas;
