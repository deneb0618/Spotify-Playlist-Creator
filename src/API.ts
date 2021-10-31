import axios from "axios";
import qs from "qs";
import Cookies from "universal-cookie";
const baseUrl = "https://api.spotify.com/v1";

const cookies = new Cookies();

const { REACT_APP_CLIENT_ID, REACT_APP_SECRET_ID, REACT_APP_API_URL } =
  process.env;

async function getAuthorizationToken() {
  return axios
    .post(
      `${REACT_APP_API_URL}/api/token`,
      qs.stringify({
        grant_type: "client_credentials",
        client_id: REACT_APP_CLIENT_ID,
        client_secret: REACT_APP_SECRET_ID,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then(function (response) {
      cookies.set("auth", response.data.access_token, {
        maxAge: response.data.expires_in,
      });
    });
}

const getAuth = async () => {
  let auth = cookies.get("auth");

  if (!auth) {
    await getAuthorizationToken();
    auth = cookies.get("auth");
  }
  return auth;
};

export async function GetPlaylists() {
  const auth = await getAuth();

  return axios
    .get(baseUrl + "/browse/featured-playlists", {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.log(e);
    });
}

export async function GetPlaylistDetail(idPlayslit: string) {
  const auth = await getAuth();

  return axios
    .get(baseUrl + "/playlists/" + idPlayslit, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
    .then((response) => {
      console.log("playlists", response);
      return response.data;
    })
    .catch((e) => {
      console.log(e);
    });
}

export async function GetCurrentPlayingTrack() {
  const params = JSON.parse(localStorage.getItem("params") as string);
  return axios
    .get(baseUrl + "/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${params.access_token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.log(e);
    });
}
