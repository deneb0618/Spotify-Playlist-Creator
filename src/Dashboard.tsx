import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import Player from "./Player";
import TrackSearchResult from "./TrackSearchResult";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: "4fb1db4af98b4d9abcb625515cdcd3cb",
});

interface Track {
  artist: string;
  title: string;
  uri: string;
  albumUrl: string;
}

export default function Dashboard({ code }: { code: string }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  function chooseTrack(track: any) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  //   useEffect(() => {
  //     if (!playingTrack) return;

  //     axios
  //       .get("http://localhost:3001/lyrics", {
  //         params: {
  //           track: playingTrack.title,
  //           artist: playingTrack.artist,
  //         },
  //       })
  //       .then((res) => {
  //         setLyrics(res.data.lyrics);
  //       });
  //   }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      //   setSearchResults(
      //     res.body.tracks?.items.map((track: Track) => {
      //         const smallestAlbumImage = track.album.images.reduce(
      //           (smallest: { height: number }, image: { height: number }) => {
      //             if (image.height < smallest.height) return image;
      //             return smallest;
      //           },
      //           track.album.images[0]
      //         );
      //       return {
      //         artist: track.artists[0].name,
      //         title: track.name,
      //         uri: track.uri,
      //         albumUrl: track.album.images[0],
      //       };
      //     })
      //   );
      console.log(res);
    });
    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  );
}
