import './App.css';
import RepoBoard from './components/RepoBoard';
import FollowersBoard from './components/FollowersBoard';

function App() {
  return (
    <div className="App">
      <RepoBoard titlename={"Top 5 Repositories With Most Stars in the Last Month"}/>
      <FollowersBoard titlename={"Top 5 Most Active Users By Followers Created Over the Last Year"}/>
    </div>
  );
}

export default App;
