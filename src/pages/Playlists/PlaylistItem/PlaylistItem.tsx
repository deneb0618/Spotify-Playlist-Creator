import { Link } from "react-router-dom";
import { Play } from "../../../assets/Play";
import { Playlist } from "../../../types/Playlist";
import styles from "./PlaylistItem.module.scss";

type PlaylistItemProps = {
  playlist: Playlist;
};

const PlaylistItem = ({ playlist }: PlaylistItemProps) => {
  const deletePlaylist = (playlistId: any) => {
    let cachedList: any = localStorage.getItem("playlist");
    let playListArray = [];
    playListArray = JSON.parse(cachedList) || [];
    var newList = playListArray.filter(function (el: any) {
      return el.id !== playlistId;
    });
    localStorage.setItem("playlist", JSON.stringify(newList));
     window.location.reload();
  };
  return (
    <Link to={`/playlist/${playlist.id}`} className={styles.LinkPlaylist}>
      <div className={styles.Playlist}>
        <div className={styles.imgContainer}>
          <img
            src="https://yt3.ggpht.com/52PtXtXNMroFAK69H7c1BnQNjuWmeohAc78CB9lX_qic9WmJljgsGbYM7I4rhnb8ZjNewJmPVg=s900-c-k-c0x00ffffff-no-rj"
            alt="Tokyo"
          />
          <div className={styles.PlayContainer}>
            <button className={styles.PlayButton} title="Play">
              <Play />
            </button>
          </div>
        </div>
        <div className={styles.Name}>{playlist.name}</div>
        <div className={styles.Artist}>{playlist.owner?.display_name}</div>
        <button
          style={{
            backgroundColor: "red",
            borderRadius: "5px",
            marginTop: 15,
          }}
          onClick={() => {
            deletePlaylist(playlist.id);
          }}
        >
          Remove Playlist
        </button>
      </div>
    </Link>
  );
};

export default PlaylistItem;
