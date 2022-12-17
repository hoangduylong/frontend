import React from 'react';
import { Box } from '@mui/material';

import Header from '../../components/header/Header';

function Layout({ children }) {
  return (
    <Box>
      <Header />
      <Box>{children}</Box>
    </Box>
  );
}

export default Layout;
