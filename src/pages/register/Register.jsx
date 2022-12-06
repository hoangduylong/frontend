import React, { useState } from 'react';
import { Box, Button, Input, InputLabel, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import axiosClient from '../../api/axios';
import login from '../../redux/actions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isErrorSnackbarMessage, setIsErrorSnackbarMessage] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleSubmit = () => {
    axiosClient
      .post('/login', {
        email,
        password,
      })
      .then(async (res) => {
        setSnackbarMessage('ログイン成功');
        setIsErrorSnackbarMessage(false);
        setShowSnackbar(true);
        dispatch(login(res.data.token, res.data.user.id, res.data.user.role));
        setTimeout(() => {
          navigate('/');
        }, 1000);
      })
      .catch((err) => {
        setSnackbarMessage(err.response.data.message);
        setIsErrorSnackbarMessage(true);
        setShowSnackbar(true);
      });
  };

  return (
    <form>
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          background: 'linear-gradient(to right, #CFDBE4, #DCF3FF)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '70%',
            height: '70%',
            display: 'flex',
            backgroundColor: 'white',
            borderRadius: '50px',
          }}
        >
          <Box
            sx={{
              width: '70%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  paddingY: '50px',
                }}
              >
                <Box>
                  <Box
                    sx={{
                      fontFamily: 'Noto Sans JP',
                      color: '#DD5371',
                      fontSize: '50px',
                      textAlign: 'center',
                      paddingBottom: '50px',
                    }}
                  >
                    レジスター
                  </Box>
                  <Box sx={{ paddingBottom: '30px' }}>
                    <InputLabel
                      sx={{
                        fontSize: '30px',
                        fontWeight: 'bold',
                      }}
                      htmlFor="電子メイル"
                    >
                      電子メイル
                    </InputLabel>
                    <Input
                      type="text"
                      placeholder="電子メイルを入力してください"
                      required
                      sx={{ width: '300px' }}
                      id="email"
                      onChange={handleEmailChange}
                      name="email"
                    />
                  </Box>
                  <Box sx={{ paddingBottom: '30px' }}>
                    <InputLabel
                      sx={{ fontSize: '30px', fontWeight: 'bold' }}
                      htmlFor="名前"
                    >
                      名前
                    </InputLabel>
                    <Input
                      type="text"
                      placeholder="名前を入力してください"
                      required
                      sx={{ width: '300px' }}
                      id="email"
                      onChange={handleEmailChange}
                      name="email"
                    />
                  </Box>
                  <Box sx={{ paddingBottom: '30px' }}>
                    <InputLabel
                      sx={{ fontSize: '30px', fontWeight: 'bold' }}
                      htmlFor="パスワード"
                    >
                      パスワード
                    </InputLabel>
                    <Input
                      type="password"
                      required
                      placeholder="パスワードを入力してください"
                      sx={{ width: '300px' }}
                      id="password"
                      onChange={handlePasswordChange}
                      name="password"
                    />
                  </Box>
                  <Box sx={{ paddingBottom: '20px' }}>
                    <InputLabel
                      sx={{ fontSize: '30px', fontWeight: 'bold' }}
                      htmlFor="パスワードを確認"
                    >
                      パスワードを確認
                    </InputLabel>
                    <Input
                      type="text"
                      placeholder="パスワードを確認を入力してください"
                      required
                      sx={{ width: '300px' }}
                      id="email"
                      onChange={handleEmailChange}
                      name="email"
                    />
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      sx={{ marginTop: '20px', backgroundColor: '#DD5371' }}
                      onClick={handleSubmit}
                    >
                      レジスター
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: '30%',
              backgroundColor: '#183A4A',
              borderTopRightRadius: '50px',
              borderBottomRightRadius: '50px',
            }}
          />
        </Box>
      </Box>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={isErrorSnackbarMessage ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </form>
  );
}

export default Login;
