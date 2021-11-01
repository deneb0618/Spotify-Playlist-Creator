import { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Like } from "../../assets/Like";
import { Play } from "../../assets/Play";
import { Pause } from "../../assets/Pause";
import { Volume } from "../../assets/Volume";
import styles from "./Player.module.scss";
import Sound from "react-sound";
import { millisToMinutesAndSeconds } from "../../utils/msToMinutes";
import { useBar } from "../../utils/useBar";
import { VolumeMuted } from "../../assets/VolumeMuted";
import { Track } from "../../types/Track";
import { GetCurrentPlayingTrack } from "../../API";
import Modal from "../Modal/Modal";

type PlayerProps = {
  playPause: () => void;
  song: Track;
  playing: boolean;
};

const Player = ({ playPause, song, playing }: PlayerProps) => {
  const [time, setTime] = useState(0);
  const timeRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  const [volume, setVolume] = useState(70);
  const volumeRef = useRef<HTMLDivElement | null>(null);

  const [mute, setMute] = useState(false);
  const [track, setTrack] = useState();
  const [sidebarState, setState] = useState({
    modal: false,
    toast: "",
  });
  const playlistRef = useRef(null);

  const barCallBack = useBar;

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
    playListArray.push({ name: playlist, id: generatePlaylistId() });
    console.log("playlist array", playListArray);
    console.log("playlist array json", JSON.stringify(playListArray));
    localStorage.setItem("playlist", JSON.stringify(playListArray));
  };
  const addPlaylist = (e: any) => {
    e.preventDefault();
    const pList: any = playlistRef;
    const list = pList.current.value;
    console.log("listtt", list);
    savePlayListToLocalStorage(list);

    // dispatch({ type: "ADD_PLAYLIST", playlist: list });

    setState({
      ...sidebarState,
      modal: false,
      toast: "Playlist was created successfully!",
    });

    // setState({
    //   ...sidebarState,
    //   modal: false,
    //   toast: "Playlist was created successfully!",
    // });
  };

  const loadCurrentSong = useCallback(async () => {
    await GetCurrentPlayingTrack().then((data) => {
      console.log("log curre", data.item);
      setTrack(data.item);
    });
  }, []);

  useEffect(() => {
    loadCurrentSong();
  }, [loadCurrentSong]);

  useEffect(() => {
    // Adjust time when progress bar is clicked
    setTime((progress * 30000) / 100);
  }, [progress]);

  useEffect(() => {
    //Reset progress if the song change
    setProgress(0);
    setTime(0);
  }, [track]);

  useEffect(() => {
    if (volume < 5) {
      setMute(true);
    } else {
      setMute(false);
    }
  }, [volume]);
  const play: any = track;

  if (!track) {
    return null;
  } else {
    return (
      <div className={styles.Player}>
        <footer>
          <div className={styles.Song}>
            <div className={styles.Img}>
              <img src={play.album.images[1].url} alt="song" />
            </div>
            <div className={styles.Infos}>
              <div className={styles.Name}>{play.name}</div>
              <div className={styles.Artist}>{play.artists[0].name}</div>
            </div>
            <div className={styles.Like}>
              <p>Add To Playlist</p>
              <Like />
            </div>
          </div>

          <div className={styles.Controls}>
            <div>
              <button onClick={playPause}>
                {playing ? <Pause /> : <Play />}
              </button>
            </div>
            <div className={styles.BarContainer}>
              <div>{millisToMinutesAndSeconds(time)}</div>
              <div
                className={styles.Wrapper}
                onClick={(event) => barCallBack(event, timeRef, setProgress)}
                ref={timeRef}
              >
                <div className={styles.Bar}>
                  <div
                    className={styles.Progress}
                    style={{ transform: `translateX(-${100 - progress}%)` }}
                  />
                </div>
                <button style={{ left: `${progress}%` }} />
              </div>
              <div>0:30</div>
            </div>
          </div>

          <div className={styles.Like} onClick={handleModal}>
            <p>Create New Playlist</p>
            <Like />
          </div>

          <div className={styles.Volume}>
            <div>
              <button onClick={() => setMute(!mute)}>
                {mute ? <VolumeMuted /> : <Volume />}
              </button>
            </div>
            <div
              className={styles.Wrapper}
              onClick={(event) => barCallBack(event, volumeRef, setVolume)}
              ref={volumeRef}
            >
              <div className={styles.Bar}>
                <div
                  className={styles.Progress}
                  style={{
                    transform: `translateX(-${mute ? "100" : 100 - volume}%)`,
                  }}
                />
              </div>
              <button style={{ left: `${mute ? "0" : volume}%` }} />
            </div>
          </div>
        </footer>
        {play.preview_url && (
          <Sound
            url={play.preview_url}
            playStatus={playing ? "PLAYING" : "PAUSED"}
            //@ts-ignore
            onPlaying={({ position }) => {
              setTime(position);
              setProgress((position * 100) / 30000);
            }}
            onFinishedPlaying={() => playPause()}
            volume={mute ? 0 : volume}
            position={time}
          />
        )}
        <Modal show={sidebarState.modal} close={handleModal}>
          <form onSubmit={addPlaylist}>
            <div className={styles.title}>New Playlist</div>
            <div className={styles.content_wrap}>
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
  }
};

const mapStateToProps = (state: {
  playing: { song: Track; playing: boolean };
}) => {
  return {
    song: state.playing.song,
    playing: state.playing.playing,
  };
};

const mapDispatchToProps = (
  dispatch: (playPause: { type: string }) => void
) => {
  return {
    playPause: () => dispatch({ type: "playpause" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
