import { Box } from '@mui/material';

function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(to right, #CFDBE4, #DCF3FF)',
      }}
    >
      <Box>
        <img src="/images/melting.png" alt="melting" />
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            fontWeight: 'bold',
            fontSize: '50px',
            paddingBottom: '20px',
            paddingX: '100px',
            color: '#183A4A',
          }}
        >
          404
        </Box>
        <Box
          sx={{
            lineHeight: 1.5,
            fontSize: '20px',
            fontFamily: 'Noto Sans JP',
            color: '#DD5371',
          }}
        >
          ページが存在しません
        </Box>
      </Box>
    </Box>
  );
}

export default NotFound;
