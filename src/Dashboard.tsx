import { createContext, useCallback, useEffect, useState } from "react";
import styles from "./App.module.scss";
import SideBar from "./components/SideBar/SideBar";
import Player from "./components/Player/Player";
import Playlists from "./pages/Playlists/Playlists";
import PlaylistDetail from "./pages/PlaylistDetail/PlaylistDetail";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Playlists as PlaylistsType } from "./types/Playlists";

export const StoreContext = createContext(null);

type DashboardProps = {
  playlists: PlaylistsType;
  initPlaylists: (data: PlaylistsType) => void;
};

const Dashboard = ({ playlists, initPlaylists }: DashboardProps) => {
  const [error, setError] = useState<null | string>();
  const loadPlaylists = useCallback(async () => {
    // await GetPlaylists().then((data) => {
    //   if (data?.playlists) {
    //     initPlaylists(data?.playlists?.items);
    //   } else {
    //     setError("Could not load data");
    //   }
    // });
    try {
      let cachedList: any = localStorage.getItem("playlist");
      let playListArray = [];
      playListArray = JSON.parse(cachedList) || [];
      initPlaylists(playListArray);
    } catch (error) {
      setError("Could not load current playing song");
    }
  }, [initPlaylists]);

  useEffect(() => {
    loadPlaylists();
  }, [loadPlaylists]);

  //   const addToPlayList = useCallback(async (track) => {
  //     console.log(track);
  //     return track;
  //   }, []);

  if (error) {
    return <div className={styles.Error}>{error}</div>;
  } else {
    return (
      <div className={styles.App}>
        <Router>
          {playlists && <SideBar />}

          <Route path="/" exact>
            {playlists && <Playlists />}
          </Route>

          <Route path="/playlist/:id">
            <PlaylistDetail />
          </Route>

          <Player />
        </Router>
      </div>
    );
  }
};

const mapStateToProps = (state: { playlists: PlaylistsType }) => {
  return {
    playlists: state.playlists,
  };
};

const mapDispatchToProps = (
  dispatch: (initPlaylists: { type: string; playlists: PlaylistsType }) => void
) => {
  return {
    initPlaylists: (data: PlaylistsType) =>
      dispatch({ type: "init", playlists: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
