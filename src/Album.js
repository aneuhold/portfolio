import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  IconButton, SvgIcon, CardContent, CardActions,
  CardMedia, Card, CssBaseline, Grid, Button,
  Typography,
} from '@material-ui/core';
import projects from './projects';
import socialLinks from './socialLinks';

const styles = theme => ({
  titleName: {
    marginTop: theme.spacing.unit * 3,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
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
    padding: theme.spacing.unit * 6,
  },
});

function Album(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography component="h4" variant="h5" align="center" color="textPrimary">
              [Software Engineering Student]
            </Typography>
            <Typography component="h4" variant="h5" align="center" color="textSecondary">
              +
            </Typography>
            <Typography component="h4" variant="h5" align="center" color="textPrimary" gutterBottom>
              <i>{'< Aspiring Developer />'}</i>
            </Typography>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" className={classes.titleName} gutterBottom>
              Anton (Tony) Neuhold
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary">
              Hi! I
              {"'"}
              m currently an online student at
              {' '}
              <a rel="noopener noreferrer" target="_blank" href="https://www.asu.edu/">Arizona State Univeristy</a>
              {' '}
              working towards a bachelors in software engineering. I live in
              {' '}
              <a rel="noopener noreferrer" target="_blank" href="https://www.google.com/maps/place/Canby,+OR+97013/@45.2711453,-122.7227492,13z/data=!3m1!4b1!4m5!3m4!1s0x5495646375ceb84f:0x110fdcab2e1cddd4!8m2!3d45.262205!4d-122.6921558">Canby, OR</a>
              {' '}
              and work at a local elementary school as a building technician.
              <br />
              <br />
              When not working, or learning new things at ASU, I like to exercise and
              learn about web development! Check out some social media links
              and projects below:
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={16} justify="center">
                {socialLinks.map(obj => (
                  <Grid item key={obj.name}>
                    <IconButton className={classes.icon} href={obj.link}>
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
        <div className={classNames(classes.layout, classes.cardGrid)} id="projects">
          {/* End hero unit */}
          <Grid container justify="center" spacing={40}>
            {projects.map(card => (
              <Grid item key={card.name} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.thumbnailUrl}
                    title={card.thumbnailDescription}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.heading}
                    </Typography>
                    <Typography>
                      {card.info}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {card.hasOwnProperty('demoLink')
                      ? (
                        <Button size="small" color="primary" href={card.demoLink} target="_blank">
                          Demo
                        </Button>
                      ) : null}
                    <Button size="small" color="primary" href={card.codeLink} target="_blank">
                      Source
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          See the code for this website
          {' '}
          <a href="https://github.com/aneuhold/React-Projects/tree/master/portfolio">here!</a>
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          ©2019 Anton Neuhold
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

Album.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Album);
