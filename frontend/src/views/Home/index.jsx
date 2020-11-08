import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";

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
}));
function Home() {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Container>
        <Paper
          className={classes.mainFeaturedPost}
          style={{
            backgroundImage: `url(${"https://www.latercera.com/resizer/kHLHjR6u3jIRC7-xl_1oXBzxWUE=/800x0/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/MEP3EKODIVGKPDXNMGNLB6ZN3A.jpg"})`,
          }}
        >
          {/* Increase the priority of the hero background image */}
          {
            <img
              style={{ display: "none" }}
              src={
                "https://www.latercera.com/resizer/kHLHjR6u3jIRC7-xl_1oXBzxWUE=/800x0/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/MEP3EKODIVGKPDXNMGNLB6ZN3A.jpg"
              }
              alt={"Monet"}
            />
          }
          <div className={classes.overlay} />
          <Grid container>
            <Grid item md={6}>
              <div className={classes.mainFeaturedPostContent}>
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                >
                  {"You are art. You are an artist"}
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  {
                    "With help of AI convert your favorite shot into a famous artist’s painting."
                  }
                </Typography>
                <Button
                  component={RouterLink}
                  to={"/canvas"}
                  color="secondary"
                //   variant="outlined"
                  className={classes.link}
                >
                  Canvas
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
