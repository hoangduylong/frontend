import React from 'react';
import { Box, Button } from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';

function ButtonAddTask() {
  const navigate = useNavigate();

  const handleRedirectAddTask = () => {
    navigate('/tasks/add');
  };

  return (
    <Box sx={{ paddingY: '20px' }}>
      <Button
        variant="text"
        sx={{
          color: '#183A4A',
          backgroundColor: 'white',
          border: '1px solid #eeeee4',
        }}
        onClick={handleRedirectAddTask}
      >
        <AddCircleIcon sx={{ paddingX: '5px', color: '#DD5371' }} />
        <Box sx={{ fontSize: '15px' }}>追加</Box>
      </Button>
    </Box>
  );
}

export default ButtonAddTask;
