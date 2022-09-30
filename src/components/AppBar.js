import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import LogoutIcon from '@mui/icons-material/Logout';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function CustomAppBar({ signOut, user }) {
  return (
    <AppBar position="relative">
      <Toolbar>
        <LibraryMusicIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          Music Player
        </Typography>
        <Typography variant="h6" color="inherit" noWrap sx={{ marginLeft: "auto" }} >
          Hello, {user.attributes.email}
        </Typography>
        <LogoutIcon sx={{ marginLeft: "auto" }} onClick={signOut} />
      </Toolbar>
    </AppBar>
  )
}