'use client';

import { Box, Link, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', p: 6 }}>
      <Typography variant="h6" align="center" gutterBottom>
        See the code for this website{' '}
        <Link
          href="https://github.com/aneuhold/portfolio"
          rel="noopener noreferrer"
          target="_blank"
          color="primary"
        >
          here!
        </Link>
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
        © {new Date().getFullYear()} Anton Neuhold
      </Typography>
    </Box>
  );
}
