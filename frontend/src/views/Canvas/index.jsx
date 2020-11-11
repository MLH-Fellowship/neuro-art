import React, { useState } from "react";
import PickArtist from "./PickArtist";
import UploadPhoto from "./UploadPhoto";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
// custom icons for stepper
// import Check from "@material-ui/icons/Check";
// import SettingsIcon from "@material-ui/icons/Settings";
// import GroupAddIcon from "@material-ui/icons/GroupAdd";
// import VideoLabelIcon from "@material-ui/icons/VideoLabel";
// import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import StyledPhoto from "./StyledPhoto";
import { TwitterShareButton, FacebookShareButton } from "react-share";
import axios from "axios";
// Images
import monet from "../../static/monet.jpg";
import afremov from "../../static/afremov.jpeg";
import munch from "../../static/munch.jpg";
import vangogh from "../../static/vangogh.jpg";

// const SUBMIT_PHOTO_ENDPOINT = process.env.REACT_APP_SUBMIT_PHOTO_ENDPOINT;
const SUBMIT_PHOTO_ENDPOINT = "http://ttt.yodelingbear.fun:5000/nst_post";
const SUBMIT_RATING_ENDPOINT = "http://ttt.yodelingbear.fun:5000/rate";
// const TEST_IMG =
//   "https://storage.googleapis.com/mlh-neuro-art.appspot.com/result_old_mcdonalds.jpg";

const artistList = [
  { name: "Leonid Afremov", key: 1, img: afremov },
  { name: "Vicent Van Gogh", key: 2, img: vangogh },
  { name: "Edvard Munch", key: 3, img: munch },
  { name: "Claude Monet", key: 4, img: monet },
];

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
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "12px 0",
    padding: "12px",
    minHeight: "200px",
  },
  shareImage: {
    maxWidth: "100%",
    maxHeight: "400px",
  },
}));

// These are the steps to be shown in the stepper
function getSteps() {
  return ["Pick a style to apply", "Upload your image", "Become an artist"];
}

function Canvas() {
  // Styles Hook
  const classes = useStyles();
  // Local State
  const [artist, setArtist] = useState(artistList[0]);
  const [picture, setPicture] = useState([]);
  const [styledPicture, setStyledPicture] = useState({
    id: undefined,
    img: null,
    targetImg: null,
  });
  const [rating, setRating] = useState(0);
  // Local State utilities
  const [loadingImage, setLoadingImage] = useState(false);

  // OnChange Controllers for Local State
  const handleArtistChange = (event) => {
    for (let person of artistList) {
      if (event.target.value === person.name) {
        setArtist(person);
        break;
      }
    }
  };
  const onDrop = (pictureFiles, pictureDataURLs) => {
    setPicture((prevPics) => [...prevPics, ...pictureFiles]);
  };
  const handleRatingChange = (event, value) => {
    setRating(value);
  };

  // Send Photo to back
  const submitPhoto = async (artist, picture) => {
    try {
      setLoadingImage(true);

      let bodyFormData = new FormData();
      if (picture[0].type === "image/jpeg" || picture[0].type === "image/png") {
        bodyFormData.set("selected_artist", artist.key);
        bodyFormData.append("target_image", picture[0]);

        // console.log("artist", artist);
        // console.log("send req", picture[0]);
        // console.log("form data", bodyFormData);

        const { data } = await axios.post(SUBMIT_PHOTO_ENDPOINT, bodyFormData);

        console.log(data);

        const { doc_id, result_image, target_image } = data;
        setStyledPicture({
          id: doc_id,
          img: result_image,
          targetImg: target_image,
        });
        setLoadingImage(false);
      }
    } catch (e) {
      console.error(
        "An error ocurred in submitting to the backend",
        e,
        e.message
      );
    }
  };
  // Send Rating
  const submitRating = async (rating) => {
    try {
      if (rating !== 0) {
        // console.log("rating", rating);
        const { data } = await axios.put(
          SUBMIT_RATING_ENDPOINT,
          {
            // Keep 'rating' asignation explicit, don't use short handed assignation
            rating: rating,
            doc_id: styledPicture.id,
          },
          {
            // We make sure we're sending an 'application/json'
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data);
      }
    } catch (e) {
      console.error("An error ocurred in submitting rating", e, e.message);
    }
  };

  // Stepper Component
  // This is the content on each step
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        console.log("artist from button", artist);
        return (
          <>
            {" "}
            <PickArtist
              style={classes}
              artistList={artistList}
              artist={artist}
              handleArtistChange={handleArtistChange}
            />
          </>
        );
      case 1:
        return (
          <>
            {" "}
            <UploadPhoto onDrop={onDrop} />
          </>
        );
      case 2:
        return (
          <>
            <StyledPhoto
              handleRatingChange={handleRatingChange}
              styledPicture={styledPicture}
              // imgURL={styledPicture.img}
            />
          </>
        );
      default:
        return "Unknown stepIndex";
    }
  }
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep + 1 === 2) {
        console.log("step 2 to step 3");
        submitPhoto(artist, picture);
      }
      if (prevActiveStep + 1 === 3) {
        console.log("step 3 to step finish");
        submitRating(rating);
      }
      return prevActiveStep + 1;
    });
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setPicture([]);
    setStyledPicture({
      id: undefined,
      img: null,
      targetImg: null,
    });
    setActiveStep(0);
  };

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          <Grid item md={12}>
            <div className={classes.root}>
              <Paper>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Paper>
              <div>
                {activeStep === steps.length ? (
                  <Paper className={classes.paper}>
                    <Grid item xs={6} style={{ textAlign: "center" }}>
                      <img
                        className={classes.shareImage}
                        src={styledPicture.img ? styledPicture.img : null}
                        alt="Styled shot"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      {/* <Box>
                      <TwitterIcon size={32} round={true} />
                      </Box> */}
                      <Typography className={classes.instructions}>
                        Don't forget to share!
                      </Typography>
                      <Button variant={"outlined"} onClick={handleReset}>
                        Try again
                      </Button>
                    </Grid>
                  </Paper>
                ) : (
                  <Grid
                    container
                    style={{ height: "100%", textAlign: "center" }}
                  >
                    {getStepContent(activeStep)}
                    <Grid
                      item
                      xs={12}
                      style={{ height: "100%", textAlign: "center" }}
                    >
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
                        {activeStep === steps.length - 1
                          ? "Send Rating"
                          : "Next"}
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </div>
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={3}></Grid>
      </Container>
    </>
  );
}

export default Canvas;
