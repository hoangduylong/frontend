import { Box, Button } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BarChartIcon from '@mui/icons-material/BarChart';

import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleRedirectHomepage = () => {
    navigate('/');
  };

  const handleRedirectCharts = () => {
    navigate('/charts');
  };

  const handleRedirectProfile = () => {
    navigate('/profile');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 70px',
        boxSizing: 'border-box',
        justifyContent: 'space-between',
        boxShadow: '5px 5px 5px grey',
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
        }}
        onClick={handleRedirectHomepage}
      >
        <EventNoteIcon sx={{ fontSize: '50px', color: '#183A4A' }} />
        <img
          src="/images/signature.png"
          alt="signature"
          style={{
            position: 'relative',
            width: '200px',
            left: '-70px',
            top: '5px',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100px',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', marginX: '10px' }}>
          <Button
            variant="outlined"
            sx={{
              color: '#183A4A',
              backgroundColor: 'white',
            }}
            onClick={handleRedirectCharts}
          >
            <BarChartIcon sx={{ fontSize: '30px', color: '#183A4A' }} />
          </Button>
        </Box>
        <Box>
          <Button
            variant="outlined"
            sx={{
              color: '#183A4A',
              backgroundColor: 'white',
            }}
            onClick={handleRedirectProfile}
          >
            <AccountCircleIcon sx={{ fontSize: '30px', color: '#183A4A' }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
