import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomAppBar from './AppBar';
import Footer from './Footer';
import SongList from './SongList';

const theme = createTheme();

export default function Album({ signOut, user, songs, audioURL, songPlaying, toggleSong, increaseHeart }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomAppBar signOut={signOut} user={user} />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <SongList songs={songs} audioURL={audioURL} songPlaying={songPlaying} toggleSong={toggleSong} increaseHeart={increaseHeart} />
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}