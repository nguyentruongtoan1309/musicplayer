import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

export default function SongList({ songs, audioURL, songPlaying, toggleSong, increaseHeart }) {

  return (
    <Grid container spacing={4}>
      {songs.map((song, index) => {
        const image = `https://source.unsplash.com/random/200x200/?music&id=${song.id}`
        return (<Grid item key={song.id} xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              image={image}
              alt="random"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography>
                {song.name}
              </Typography>
              <Typography>
                <b>{song.author}</b>
              </Typography>
            </CardContent>
            <CardActions style={{ height: '30px', maxHeight: '30px' }}>
              <IconButton id='play-pause-music' style={{ margin: '0 auto 0 auto' }} aria-label="play" onClick={() => toggleSong(index)}>
                {songPlaying === index ? <PauseCircleIcon /> : <PlayCircleIcon />}
              </IconButton>
              {
                songPlaying === index ? (
                  <audio
                    autoPlay={true}
                    controls
                    src={audioURL}
                    onPause={() => toggleSong(index)}>
                  </audio>
                ) : null
              }
            </CardActions>
            <CardActions style={{ display: 'inline-block' }}>
              <div >
                <IconButton aria-label="heart" onClick={() => increaseHeart(index)}>
                  <FavoriteIcon style={{ 'color': 'red' }} />
                </IconButton>
                {song.heart}
              </div>
            </CardActions>
          </Card>
        </Grid>)
      }
      )}
    </Grid>
  )
}