import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { purple } from '@material-ui/core/colors';
import { teal } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 5,
  },
  paper: {
    padding: theme.spacing(1.5),
    textAlign: 'center',
    backgroundColor: teal[100],
    color: purple[300],
  },
}));

function Entry(props) {
  const classes = useStyles();
  return (
    <div className = {classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
        >
          <Grid item xs={3}> <Paper className={classes.paper} elevation={3}> {props.id}</Paper></Grid>
          <Grid item xs={3}> <Paper className={classes.paper} elevation={3}> {props.name}</Paper></Grid>
          <Grid item xs={3}> <Paper className={classes.paper} elevation={3}> {props.description}</Paper></Grid>
          <Grid item xs={3}> <Paper className={classes.paper} elevation={3}> {props.stars}</Paper></Grid>
      </Grid>
    </div>
  )
}

export default Entry
