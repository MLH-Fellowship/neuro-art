import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
// import CarouselShowcase from "../../components/Carousel";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";

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
    minWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paperContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  paper: {
    minHeight: "100px",
    padding: theme.spacing(5),
  },
  media: {
    height: 180,
  },
  card: {
    margin: "12px",
  },
}));
function PickArtist({ styles, artistList, artist, handleArtistChange }) {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} spacing={3} className={classes.paperContainer}>
        <Paper className={classes.paper}>
          <FormControl className={classes.formControl}>
            <InputLabel id="artist-select">Pick one Artist</InputLabel>
            <Select
              labelId="artist-select"
              id="artist-select"
              value={artist.name}
              onChange={handleArtistChange}
            >
              {artistList.map((artist, i) => (
                <MenuItem value={artist.name} key={i}>
                  {artist.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      </Grid>
      <Grid container>
        {artistList.map((artist, i) => (
          <Grid item xs={3}>
            <Card className={classes.card} key={i}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={artist.img}
                  title={`${artist.name}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h5">
                    {artist.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
              {/* <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      // onClick={handleArtistChange}
                    >
                      Select
                    </Button>
                  </CardActions> */}
            </Card>
          </Grid>
        ))}
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
