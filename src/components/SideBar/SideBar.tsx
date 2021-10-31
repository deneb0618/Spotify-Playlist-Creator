import styles from "./SideBar.module.scss";
import { Logo } from "../../assets/Logo";
import ListItem from "./ListItem/ListItem";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Playlist } from "../../types/Playlist";
import { useRef, useState } from "react";
import Modal from "../Modal/Modal";

type SideBarProps = {
  playlists: Playlist[];
};

const SideBar = ({ playlists }: SideBarProps) => {
  const [sidebarState, setState] = useState({
    modal: false,
    toast: "",
  });
  const playlistRef = useRef(null);

  const handleModal = () =>
    setState({ ...sidebarState, modal: !sidebarState.modal });
  const addPlaylist = (e: any) => {
    e.preventDefault();
    // const list = playlistRef.current ? playlistRef.current.value : null;

    // dispatch({ type: "ADD_PLAYLIST", playlist: list });

    setState({
      ...sidebarState,
      modal: false,
      toast: "Playlist was created successfully!",
    });

    setState({
      ...sidebarState,
      modal: false,
      toast: "Playlist was created successfully!",
    });
  };
  return (
    <div className={styles.SideBar}>
      <Link style={{ textDecoration: "none", color: "white" }} to="/">
        <div className={styles.Logo}>
          <Logo />
        </div>
      </Link>

      <h1 className={styles.Title}>Playlists</h1>

      <hr className={styles.Separator} />

      <div className={styles.ListContainer}>
        <ul className={styles.List}>
          {playlists?.map((item: Playlist) => {
            return <ListItem playlist={item} key={item.id} />;
          })}
        </ul>
        <span onClick={handleModal} className={styles.New}>
          New Playlist
        </span>
      </div>
      <Modal show={sidebarState.modal} close={handleModal}>
        <form onSubmit={addPlaylist}>
          <div className="title">New Playlist</div>

          <div className="content-wrap">
            <input
              type="text"
              placeholder="My Playlist"
              ref={playlistRef}
              required
            />

            <br />

            <button type="submit">Create</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: { playlists: { playlists: Playlist[] } }) => {
  return {
    playlists: state.playlists.playlists,
  };
};

export default connect(mapStateToProps)(SideBar);
