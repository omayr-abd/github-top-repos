import React, {useState, useEffect} from 'react';
import Entry from './Entry';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { teal } from '@material-ui/core/colors';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: teal[100],
    color: purple[300],
    margin: 10,
  },
}));

function RepoBoard(props) {
  const [data, setData] = useState({ data: []});
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`https://api.github.com/search/repositories?q=created:">2020-10-06"&sort=stars&order=desc&per_page=5`);
      if (result) {
        //console.log(result)
        //console.log("result reached!");
        setData(result.data);
      }
      
    }
    fetchData();
    // refresh every 60 sec
    // const refresh = setInterval(() => {
    //   fetchData();
    // }, 60000);
    // return () => clearInterval(refresh);

  }, [props]);

  //console.log(data);
  const classes = useStyles();
  if (data && data.items) {
    return (
      <div>
        <Grid item xs={12}> <Paper className={classes.title} elevation={3}> {props.titlename}</Paper></Grid>
        <Entry id="Repo ID" name="Repo Name" description="Repo Description" stars= "Repo Stars"/>
        {
          data.items.map((elem) => {
            const id = elem.id;
            const name = elem.name;
            const description = elem.description;
            const stars = elem.stargazers_count;
            return (
              <Entry id={id} name={name} description={description} stars={stars}/>
            )
          })
        }
        <Button className={classes.title} id="hot_repo" size="large">Refresh</Button>
      </div>
    )
  } else {
    return (
      <Grid item xs={12}> <Paper className={classes.title} elevation={3}> {props.titlename} has no data!</Paper></Grid>
    );
  }
}

export default RepoBoard
