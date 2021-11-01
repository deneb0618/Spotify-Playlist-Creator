import { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import Modal from "../../components/Modal/Modal";
import { Playlist as PlaylistType } from "../../types/Playlist";
import Playlist from "./PlaylistItem/PlaylistItem";
import styles from "./Playlists.module.scss";

type PlaylistsProps = {
  playlists: PlaylistType[];
};

const Playlists = ({ playlists }: PlaylistsProps) => {
  const playlistRef = useRef(null);
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
  const [sidebarState, setState] = useState({
    modal: false,
  });

  useEffect(() => {
    loadPlaylists();
  }, [loadPlaylists]);
  const handleModal = () =>
    setState({ ...sidebarState, modal: !sidebarState.modal });
  const generatePlaylistId = () => {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 16; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const savePlayListToLocalStorage = (playlist: any) => {
    let cachedList: any = localStorage.getItem("playlist");
    let playListArray = [];
    playListArray = JSON.parse(cachedList) || [];
    playListArray.push({
      name: playlist,
      id: generatePlaylistId(),
      tracks: [],
    });
    localStorage.setItem("playlist", JSON.stringify(playListArray));
  };

  const addPlaylist = (e: any) => {
    e.preventDefault();
    const pList: any = playlistRef;
    const list = pList.current.value;
    savePlayListToLocalStorage(list);
    setState({
      ...sidebarState,
      modal: false,
    });
    window.location.reload();
  };
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
            <div className={styles.Like} onClick={handleModal}>
              <p>Create New Playlist</p>
            </div>
          </>
        ) : (
          <>
            {playlists?.map((item: PlaylistType) => (
              <Playlist key={item.id} playlist={item} />
            ))}
            <div className={styles.Like} onClick={handleModal}>
              <p>Create New Playlist</p>
            </div>
          </>
        )}
      </div>
      <Modal show={sidebarState.modal} close={handleModal}>
        <form style={{ textAlign: "center" }} onSubmit={addPlaylist}>
          <div
            style={{ fontSize: 18, marginBottom: 20 }}
            className={styles.title}
          >
            New Playlist
          </div>
          <div className={styles.content_wrap}>
            <input
              type="text"
              placeholder="My Playlist"
              ref={playlistRef}
              required
              style={{
                fontSize: 16,
                borderRadius: "5px",
              }}
            />
            <br />
            <button
              style={{
                marginTop: 15,
                backgroundColor: "green",
                borderRadius: "5px",
              }}
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </Modal>
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
