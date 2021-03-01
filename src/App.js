import { useEffect } from "react";
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useDataLayerValue } from "./DataLayer";

//create an instance of spotify in the app
const spotify = new SpotifyWebApi(); 

function App() {
const [{ user, token }, dispatch] = useDataLayerValue();

  // Run code based on given condition 
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      })
      
      spotify.setAccessToken(_token);

      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      });      //Promise to get users account

      spotify.getUserPlaylists().then((playlists) => {
        dispatch ({
          type: "SET_PLAYLISTS",
          playlists: playlists
        })
      })

      spotify.getPlaylist("37i9dQZEVXcV2lpvXAI2Ll").then(response => 
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response
        })
      )
    }
  }, []);

  return (
    <div className="app">
      {
        //verify token before going into the player
        token ? (
          <Player spotify={spotify} />
        ) : (
          <Login />
        )
      }
    </div>
  );
}

export default App;
