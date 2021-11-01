import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

export async function GetCurrentPlayingTrack() {
  const params = JSON.parse(localStorage.getItem("params") as string);
  return axios
    .get(`${REACT_APP_BASE_URL}/me/player/currently-playing`, {
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
