import { Play } from "../../../assets/Play";
import { formatDate } from "../../../utils/formatDate";
import { millisToMinutesAndSeconds } from "../../../utils/msToMinutes";
import styles from "./SongItem.module.scss";

type SongItemPros = {
  song: any;
  index: number;
  songClicked: () => void;
  current: boolean;
};

export const SongItem = ({
  song,
  index,
  songClicked,
  current,
}: SongItemPros) => {
  return (
    <>
      {song && (
        <div
          className={[
            styles.Item,
            song.preview_url ? styles.Enabled : styles.Disabled,
          ].join(" ")}
          onClick={songClicked}
        >
          <div className={styles.Index}>
            <span style={current ? { color: "#1db954" } : { color: "white" }}>
              {index + 1}
            </span>
            <button>
              <Play />
            </button>
          </div>

          <div className={styles.Title}>
            <img src={song.album.images[0].url} alt="cover img" />
            <div className={styles.NameContainer}>
              <div
                className={styles.Name}
                style={current ? { color: "#1db954" } : { color: "white" }}
              >
                <span>{song.name}</span>
              </div>
              {song.explicit && <span className={styles.Explicit}>e</span>}
              <span
                className={[
                  styles.Artist,
                  song.explicit ? styles.Artist_sub : styles.Artist_badg,
                ].join(", ")}
              >
                {song.artists[0].name}
              </span>
            </div>
          </div>
          <div>{song.album.name}</div>
          <div>{formatDate(song.album.release_date)}</div>
          <div className={styles.Length}>
            {millisToMinutesAndSeconds(song.duration_ms)}
            <button className={styles.More}>...</button>
          </div>
        </div>
      )}
    </>
  );
};
