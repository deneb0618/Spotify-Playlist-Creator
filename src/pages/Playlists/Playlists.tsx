import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Playlist as PlaylistType } from "../../types/Playlist";
import Playlist from "./PlaylistItem/PlaylistItem";
import styles from "./Playlists.module.scss";

type PlaylistsProps = {
  playlists: PlaylistType[];
};

const Playlists = ({ playlists }: PlaylistsProps) => {
  const [playList, setPlayList] = useState([]);
  const loadPlaylists = useCallback(async () => {
    try {
      let cachedList: any = localStorage.getItem("playlist");
      let playListArray = [];
      playListArray = JSON.parse(cachedList) || [];
      setPlayList(playListArray);
    } catch (error) {
      console.log(error);
    }
  }, [setPlayList]);

  useEffect(() => {
    loadPlaylists();
  }, [loadPlaylists]);
  return (
    <div className={styles.Playlists}>
      <h1 className={styles.Title}>Playlists</h1>

      <div className={styles.Container}>
        {playList.length < 1 ? (
          <>
            <p className={styles.List}>
              You don't have any custom playlists yet. Start by creating one
              after playing music in your app!
            </p>
          </>
        ) : (
          <>
            {playlists?.map((item: PlaylistType) => (
              <Playlist key={item.id} playlist={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: {
  playlists: { playlists: PlaylistType[] };
}) => {
  return {
    playlists: state.playlists.playlists,
  };
};

export default connect(mapStateToProps)(Playlists);
