import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Neuro Art
          </Typography>
          <nav>
            <Link
              component={RouterLink}
              to={"/"}
              variant="button"
              color="textPrimary"
              href="/"
              className={classes.link}
            >
              Home
            </Link>
            <Link
              component={RouterLink}
              to={"/about"}
              variant="button"
              color="textPrimary"
              href="/about"
              className={classes.link}
            >
              About
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              component={RouterLink}
              to={"/showcase"}
              className={classes.link}
            >
              Showcase
            </Link>
          </nav>
          <Button
            component={RouterLink}
            to={"/canvas"}
            color="primary"
            variant="outlined"
            className={classes.link}
          >
            Canvas
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
