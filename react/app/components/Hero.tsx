'use client';

import socialLinks from '$shared/config/socialLinks';
import { Box, Grid, IconButton, Link, SvgIcon, Typography } from '@mui/material';

export default function Hero() {
  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <Box sx={{ maxWidth: 600, m: '0 auto', bgcolor: 'background.paper', pt: 8, pb: 6 }}>
        <Typography component="h4" variant="h5" align="center" color="text.primary">
          [Software Engineer]
        </Typography>
        <Typography component="h4" variant="h5" align="center" color="text.secondary">
          +
        </Typography>
        <Typography component="h4" variant="h5" align="center" color="text.primary" gutterBottom>
          <i>{'< Web Developer />'}</i>
        </Typography>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          sx={{ mt: 3 }}
          gutterBottom
        >
          Anton (Tony) Neuhold
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary">
          {"Hi! I'm a Software Engineer currently working at "}
          <Link
            rel="noopener noreferrer"
            color="primary"
            target="_blank"
            href="https://www.predictiveindex.com/"
          >
            The Predictive Index
          </Link>
          {' with a bachelors degree in the same from '}
          <Link
            rel="noopener noreferrer"
            color="primary"
            target="_blank"
            href="https://www.asu.edu/"
          >
            Arizona State University
          </Link>
          {'. I live in '}
          <Link
            rel="noopener noreferrer"
            color="primary"
            target="_blank"
            href="https://www.google.com/maps/place/Canby,+OR+97013/@45.2711453,-122.7227492,13z"
            aria-label="Canby, OR on Google Maps"
          >
            Canby, OR
          </Link>
          {'. '}
          <br />
          <br />
          When not working, or learning new things about development, I like to exercise and hang
          out with my two pets and beautiful wife. Check out some social media links and projects
          below:
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={4} justifyContent="center">
            {socialLinks.map((obj) => (
              <Grid item key={obj.name}>
                <IconButton href={obj.link}>
                  <SvgIcon color="primary">{obj.svgIconPath}</SvgIcon>
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
