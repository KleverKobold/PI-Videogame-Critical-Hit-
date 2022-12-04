import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import { GameCreate } from './components/GameCreate/GameCreate';
import VideoGameDetail from "./components/VideoGameDetail/VideoGameDetail"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path ="/" component={LandingPage}/>
        <Route exact path="/home" component={Home}/>
        <Route path="/game" component={GameCreate}/>
        <Route exact path="/home/:id" component={VideoGameDetail}/>
      </Switch>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
