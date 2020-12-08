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

async function getFollowers(login) {
    const followers = await axios.get(`https://api.github.com/users/${login}`);
    return followers;
};


function FollowersBoard(props) {
  const [data, setData] = useState({ data: []});
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`https://api.github.com/search/users?q=followers%3A%3E%3D1000&ref=searchresults&s=followers&type=Users&per_page=5`);
      if (result) {
        //console.log(result)
        //console.log("result reached!");
        setData(result.data);
      }
      
    }
    fetchData();
    //refresh every 60 sec
    const refresh = setInterval(() => {
      fetchData();
    }, 120000);
    return () => clearInterval(refresh);

  }, [props]);


  //console.log(data);
  const classes = useStyles();
  if (data && data.items) {
    return (
      <div>
        <Grid item xs={12}> <Paper className={classes.title} elevation={3}> {props.titlename}</Paper></Grid>
        <Entry id="User ID" name="User Login" description="User Image" stars= "Number of Followers"/>
        {
          data.items.map((elem) => {
            const id = elem.id;
            const login = elem.login;
            const avatar = elem.avatar_url;
            const followers = getFollowers(login);
            console.log(followers);
            return (
              <Entry id={id} name={login} description={avatar} stars={followers.data}/>
            )
          })
        }
        <Button className={classes.title} id="prolific_users" size="large">Refresh</Button>
      </div>
    )
  } else {
    return (
      <Grid item xs={12}> <Paper className={classes.title} elevation={3}> {props.titlename} has no data!</Paper></Grid>
    );
  }
}

export default FollowersBoard
