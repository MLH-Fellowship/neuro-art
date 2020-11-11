import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import Hero from "../../components/Hero";
import { Box } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  howItWorks: {
    background: "#bbdefb",
  },
  h3: {
    marginTop: theme.spacing(2),
  },
  card: {
    margin: theme.spacing(2),
  },
  media: {
    height: 140,
  },
}));
function Home() {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Hero />
      <Container className={classes.howItWorks}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant={"h3"} className={classes.h3}>
              How it works
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  // image="../../static/Imagenbarco.jpg"
                  image="https://source.unsplash.com/random"
                  title="Ship"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    1.Pick a style
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Select among some of the most famous artists around the
                    world. Their style will be transfered.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={"/showcase"}
                >
                  Showcase
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid xs={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  // image="../../static/Imagenbarco.jpg"
                  image="https://source.unsplash.com/random"
                  title="Ship"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    2. Upload your picture
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Our Machine Learning model will transfer the artist style to
                    your picture.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={"/about"}
                >
                  About
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid xs={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  // image="../../static/Imagenbarco.jpg"
                  image="https://source.unsplash.com/random"
                  title="Ship"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    3. You're an artist!
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    It might take a couple of minutes, because #GPU but... hey,
                    It looks like an actual classical painting.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={"/canvas"}
                >
                  TRY NOW
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
