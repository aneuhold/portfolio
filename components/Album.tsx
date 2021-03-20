import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
  IconButton, SvgIcon, CardContent, CardActions,
  CardMedia, Card, CssBaseline, Grid, Button,
  Typography,
  Theme,
  createStyles,
  WithStyles,
  Link,
} from '@material-ui/core';
import projects from './projects';
import socialLinks from './socialLinks';

const styles = ({ breakpoints, palette, spacing }: Theme) => createStyles({
  titleName: {
    marginTop: spacing() * 3,
  },
  heroUnit: {
    backgroundColor: palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${spacing() * 8}px 0 ${spacing() * 6}px`,
  },
  heroButtons: {
    marginTop: spacing() * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: spacing() * 3,
    marginRight: spacing() * 3,
    [breakpoints.up(1100 + spacing() * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${spacing() * 8}px 0`,
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
    backgroundColor: palette.background.paper,
    padding: spacing() * 6,
  },
});

/*
  Props held as a placeholder in case some additional ones should be added
*/
interface AlbumProps extends WithStyles<typeof styles> {
}

const Album = withStyles(styles)(({ classes }: AlbumProps) => (
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
            <i>{'< Web Developer />'}</i>
          </Typography>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" className={classes.titleName} gutterBottom>
            Anton (Tony) Neuhold
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary">
            Hi! I
            {"'"}
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
            <Grid container spacing={4} justify="center">
              {socialLinks.map(obj => (
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
      {/* End hero unit */}

      <div className={classNames(classes.layout, classes.cardGrid)} id="projects">
        <Grid container justify="center" spacing={4}>
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
                      <Button size="small" color="primary" href={card.demoLink || ""} target="_blank">
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
        ©2020 Anton Neuhold
      </Typography>
    </footer>
    {/* End footer */}

  </React.Fragment>
));

export default Album;
