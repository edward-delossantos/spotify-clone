import { useEffect, useState } from "react";
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";

const spotify = new SpotifyWebApi(); //create an instance of spotify in the app

function App() {
  const [token, setToken] = useState(null);

  // Run code based on given condition 
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
    
      spotify.setAccessToken(_token);

      spotify.getMe().then(user => {
        console.log(":person:", user)
      })      //Promise to get users account
    }
  }, []);

  return (
    <div className="app">
      {
        token ? (
          <Player /> //verify token before going into the player
        ) : (
          <Login />
        )
      }
    </div>
  );
}

export default App;
