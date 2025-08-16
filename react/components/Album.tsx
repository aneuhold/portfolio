import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Theme,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import projects from 'shared/config/projects';

const useStyles = makeStyles((theme: Theme) => ({
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
}));

export default function Album(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classNames(classes.layout, classes.cardGrid)} id="projects">
      <Grid container justifyContent="center" spacing={4}>
        {projects.map((card) => (
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
                <Typography>{card.info}</Typography>
              </CardContent>
              <CardActions>
                {card.demoLink ? (
                  <Button
                    size="small"
                    color="primary"
                    href={card.demoLink || ''}
                    target="_blank"
                  >
                    Demo
                  </Button>
                ) : null}
                <Button
                  size="small"
                  color="primary"
                  href={card.codeLink}
                  target="_blank"
                >
                  Source
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
