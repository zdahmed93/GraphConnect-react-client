import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import WbSunnyTwoToneIcon from '@material-ui/icons/WbSunnyTwoTone';
import Brightness2TwoToneIcon from '@material-ui/icons/Brightness2TwoTone';
import Switch from '@material-ui/core/Switch';
import {Link} from 'react-router-dom'

import {ThemeContext} from '../material-ui/ThemeProvider'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const {toggleTheme} = useContext(ThemeContext)
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            GraphConnect
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/register">Register</Button>
          <WbSunnyTwoToneIcon />
          <Switch onChange={toggleTheme} />
          <Brightness2TwoToneIcon />
        </Toolbar>
      </AppBar>
    </div>
  );
}
