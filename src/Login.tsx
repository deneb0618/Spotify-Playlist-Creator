import styles from "./App.module.scss";
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=74c26f74eb5d43e1a5aec8cf82065105&response_type=code&redirect_uri=http://localhost:3000/callback&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing";

export default function Login() {
  return (
    <div className={styles.Login} style={{ minHeight: "100vh" }}>
      <a href={AUTH_URL}>Login With Spotify</a>
    </div>
  );
}
