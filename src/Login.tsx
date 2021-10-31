import styles from "./App.module.scss";
const { REACT_APP_CLIENT_ID, REACT_APP_AUTHORIZE_URL, REACT_APP_REDIRECT_URL } =
  process.env;
const AUTH_URL = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${REACT_APP_REDIRECT_URL}&show_dialog=true&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing`;

export default function Login() {
  return (
    <div className={styles.Login}>
      <a href={AUTH_URL}>Login With Spotify</a>
    </div>
  );
}
