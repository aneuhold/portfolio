import React from 'react';
import {
  IconButton, SvgIcon,
  Grid,
  Typography,
  Theme,
  makeStyles,
  Link,
} from '@material-ui/core';
import socialLinks from '../config/socialLinks';

const useStyles = makeStyles((theme: Theme) => ({
  titleName: {
    marginTop: theme.spacing(3),
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up('lg')]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Hero(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.heroUnit}>
      <div className={classes.heroContent}>
        <Typography component="h4" variant="h5" align="center" color="textPrimary">
          [Software Engineering Student]
        </Typography>
        <Typography component="h4" variant="h5" align="center" color="textSecondary">
          +
        </Typography>
        <Typography component="h4" variant="h5" align="center" color="textPrimary" gutterBottom>
          <i>{'< Web Developer />'}</i>
        </Typography>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" className={classes.titleName} gutterBottom>
          Anton (Tony) Neuhold
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary">
          Hi! I
          &apos;
          m currently an online student at
          {' '}
          <Link rel="noopener noreferrer" color="primary" target="_blank" href="https://www.asu.edu/">Arizona State Univeristy</Link>
          {' '}
          working towards a bachelors in software engineering. I live in
          {' '}
          <Link rel="noopener noreferrer" color="primary" target="_blank" href="https://www.google.com/maps/place/Canby,+OR+97013/@45.2711453,-122.7227492,13z/data=!3m1!4b1!4m5!3m4!1s0x5495646375ceb84f:0x110fdcab2e1cddd4!8m2!3d45.262205!4d-122.6921558">Canby, OR</Link>
          {' '}
          and currently work as a Cloud Software Specialist at a large IT reseller.
          <br />
          <br />
          When not working, or learning new things at ASU, I like to exercise and
          learn more about web development! Check out some social media links
          and projects below:
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={4} justifyContent="center">
            {socialLinks.map((obj) => (
              <Grid item key={obj.name}>
                <IconButton href={obj.link}>
                  <SvgIcon color="primary">
                    {obj.svgIconPath}
                  </SvgIcon>
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}
