'use client';

import projectImages, { getImageSrc } from '$lib/projectImages';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material';
import projects, { type ProjectKey } from 'shared/config/projects';

export default function Album() {
  return (
    <Box
      id="projects"
      sx={{
        width: 'auto',
        mx: 3,
        pt: 8,
        pb: 8,
        '@media (min-width:1200px)': {
          width: 1100,
          mx: 'auto'
        }
      }}
    >
      <Grid container justifyContent="center" spacing={4}>
        {Object.entries(projects).map(([key, card]) => (
          <Grid item key={card.name} sm={6} md={4} lg={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                sx={{ pt: '56.25%' }}
                image={getImageSrc(projectImages[key as ProjectKey])}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {card.heading}
                </Typography>
                <Typography>{card.info}</Typography>
              </CardContent>
              <CardActions>
                {card.demoLink ? (
                  <Button size="small" color="primary" href={card.demoLink || ''} target="_blank">
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
    </Box>
  );
}
