import { Playlists } from "../../types/Playlists";

const playlistReducer = (
  state = {
    playlists: [],
  },
  action: { type: "init"; playlists: Playlists }
) => {
  console.log("init", action.playlists);
  switch (action.type) {
    case "init":
      return { playlists: action.playlists };
    default:
      return state;
  }
};

export default playlistReducer;
