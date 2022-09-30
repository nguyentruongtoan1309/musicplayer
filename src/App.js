import './App.css';
import { Amplify, API, graphqlOperation, Storage } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import configure from "./aws-exports";
import '@aws-amplify/ui-react/styles.css';
import { listSongs } from "./graphql/queries";
import { updateSong } from "./graphql/mutations";
import React, { useEffect, useState } from 'react';

import Album from './components/Album';

Amplify.configure(configure);

function App({ signOut, user }) {

  const [songs, setSongs] = useState([]);
  const [songPlaying, setSongPlaying] = useState('');
  const [audioURL, setAudioURL] = useState('');

  useEffect(() => {
    getSongs();
  }, [])

  const getSongs = async () => {
    try {
      const songData = await API.graphql(graphqlOperation(listSongs));
      setSongs(songData.data.listSongs.items)
    } catch (error) {
      console.error('error on get songs: ', error);
    }
  }

  const increaseHeart = async index => {
    try {
      const song = songs[index];
      song.heart += 1;
      delete song.createdAt;
      delete song.updatedAt;

      const songData = await API.graphql(graphqlOperation(updateSong, { input: song }));

      const songList = [...songs];
      songList[index] = songData.data.updateSong;
      setSongs([...songs]);
    } catch (error) {
      console.error('error on increase heart: ', error);
    }
  }

  const toggleSong = async index => {
    if (songPlaying === index) {
      setSongPlaying('')
      return
    }

    const songFilePath = songs[index].filePath;
    try {
      const fileAccessURL = await Storage.get(songFilePath, { expires: 60 })
      setSongPlaying(index);
      setAudioURL(fileAccessURL);
      return;
    } catch (error) {
      console.error('error accessing the file from S3: ', error);
      setAudioURL('');
      setSongPlaying('');
    }
  }

  return (
    <div className="App">
      <Album signOut={signOut} user={user} songs={songs} audioURL={audioURL} songPlaying={songPlaying} toggleSong={toggleSong} increaseHeart={increaseHeart} />
    </div>

  );
}

export default withAuthenticator(App);
