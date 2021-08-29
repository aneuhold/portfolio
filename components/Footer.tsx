import React from 'react';
import {
  Typography,
  Theme,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Footer(): JSX.Element {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        See the code for this website
        {' '}
        <Link
          href="https://github.com/aneuhold/portfolio"
          rel="noopener noreferrer"
          target="_blank"
          color="primary"
        >
          here!
        </Link>
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        ©
        {(new Date()).getFullYear()}
        {' '}
        Anton Neuhold
      </Typography>
    </footer>
  );
}
