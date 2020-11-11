import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Hero from "../../components/Hero";
import Header from "../../components/Header";
import { Grid, Container, Typography } from "@material-ui/core";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import BarChartIcon from "@material-ui/icons/BarChart";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";

import nst_img from "./../../static/nst_example.png";

const useStyles = makeStyles((theme) => ({
  mainTitle: {
    margin: "48px 0 24px",
  },
  mainText: {
    margin: "12px 0",
  },
  container: {
    margin: "30px 0",
  },
  img: {
    maxHeight: "300px",
    maxwidth: "100%",
  },
  stepDescription: {
    height: "70px",
    margin: "24px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
  },
  stepIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "70px",
    margin: "24px 0",
    padding: "0 12px",
  },
}));

function About() {
  const classes = useStyles();

  return (
    <>
      <Header
        title={"About"}
        text1={`Neuro Art🎨 uses Machine Learning to style transfer the artist’s 
          technique.We chose among some of the most representative artists around the world to train our network.`}
      />
      <Container>
        <Grid container className={classes.container}>
          <Grid item md={6} className={classes.mainTitle}>
            <Typography variant="h3">Neural style transfer (NST)</Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.container} justify="center">
          <Grid item md={8}>
            <Typography>
              Neural style transfer is an optimization technique used to take
              two images—a content image and a style reference image (such as an
              artwork by a famous painter)—and blend them together so the output
              image looks like the content image, but “painted” in the style of
              the style reference image.
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.container} justify="center">
          <Grid item>
            <img className={classes.img} src={nst_img} alt="Unstyle" />
          </Grid>
        </Grid>
        <Grid container className={classes.container} justify="center">
          <Grid item md={8}>
            <Typography>
              This is implemented by optimizing the output image to match the
              content statistics of the content image and the style statistics
              of the style reference image. These statistics are extracted from
              the images using a convolutional network.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container>
          <Grid item md={6}>
            <Typography variant="h3" className={classes.mainTitle}>Steps to Neuro Art 🎨</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            md={4}
            xs={2}
            // display="flex"
            // justify="right"
            // alignItems="center"
            className={classes.stepIcon}
          >
            <EmojiObjectsIcon color="action" style={{ fontSize: 40 }} />
          </Grid>
          <Grid
            item
            md={8}
            xs={10}
            className={classes.stepDescription}
            alignItems="center"
          >
            <Typography variant="h5">
              Understand neuro style transfer () => read a lot.
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            md={4}
            xs={2}
            // display="flex"
            // justify="right"
            // alignItems="center"
            className={classes.stepIcon}
          >
            <ShoppingCartIcon color="action" style={{ fontSize: 40 }} />
          </Grid>
          <Grid
            item
            md={8}
            xs={10}
            className={classes.stepDescription}
            alignItems="center"
          >
            <Typography variant="h5">
              Gather our data, ie, collect paintings.
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            md={4}
            xs={2}
            // display="flex"
            // justify="right"
            // alignItems="center"
            className={classes.stepIcon}
          >
            <BarChartIcon color="action" style={{ fontSize: 40 }} />
          </Grid>
          <Grid
            item
            md={8}
            xs={10}
            className={classes.stepDescription}
            alignItems="center"
          >
            <Typography variant="h5">Build model using Tensor Flow.</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            md={4}
            xs={2}
            // display="flex"
            // justify="right"
            // alignItems="center"
            className={classes.stepIcon}
          >
            <DirectionsRunIcon color="action" style={{ fontSize: 40 }} />
          </Grid>
          <Grid
            item
            md={8}
            xs={10}
            className={classes.stepDescription}
            alignItems="center"
          >
            <Typography variant="h5">Train, test and correct model.</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            md={4}
            xs={2}
            // display="flex"
            // justify="right"
            // alignItems="center"
            className={classes.stepIcon}
          >
            <FlightTakeoffIcon color="action" style={{ fontSize: 40 }} />
          </Grid>
          <Grid
            item
            md={8}
            xs={10}
            className={classes.stepDescription}
            alignItems="center"
          >
            <Typography variant="h5">Deploy...</Typography>
          </Grid>
        </Grid>
      </Container>
      <Hero />
    </>
  );
}

export default About;
