import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  InputLabel,
  Link,
  Checkbox,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

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
    if (email === '') {
      setSnackbarMessage('メールアドレス必須');
      setIsErrorSnackbarMessage(true);
      setShowSnackbar(true);
      return;
    }

    if (!validator.isEmail(email)) {
      setSnackbarMessage('メールの形式が間違い');
      setIsErrorSnackbarMessage(true);
      setShowSnackbar(true);
      return;
    }

    if (password === '') {
      setSnackbarMessage('パスワード必須');
      setIsErrorSnackbarMessage(true);
      setShowSnackbar(true);
      return;
    }

    if (password.length < 8) {
      setSnackbarMessage('パスワード8文字以上必要');
      setIsErrorSnackbarMessage(true);
      setShowSnackbar(true);
      return;
    }
    axiosClient
      .post('/auth/login', {
        email,
        password,
      })
      .then(async (res) => {
        setSnackbarMessage('ログイン成功');
        setIsErrorSnackbarMessage(false);
        setShowSnackbar(true);
        axiosClient.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
        dispatch(login(res.data.token, res.data.id));
        setTimeout(() => {
          window.location.reload();
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
                    }}
                  >
                    ログイン
                  </Box>
                  <Box sx={{ paddingY: '50px' }}>
                    <InputLabel
                      sx={{ fontSize: '30px', fontWeight: 'bold' }}
                      htmlFor="電子メイル
                      "
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
                  <Box sx={{ paddingY: '15px' }}>
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
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'baseline',
                      width: '300px',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'baseline',
                        position: 'relative',
                        left: '-10px',
                        marginTop: '-20px',
                      }}
                    >
                      <Checkbox
                        id="remember"
                        sx={{ position: 'relative', top: '7px' }}
                      />
                      <InputLabel
                        htmlFor="remember"
                        sx={{ cursor: 'pointer', fontSize: '12px' }}
                      >
                        次回から表示しない
                      </InputLabel>
                    </Box>
                    <Box>
                      <Link
                        to="/forgot-password"
                        style={{
                          textDecoration: 'none',
                          cursor: 'pointer',
                          color: '#DD5371',
                          fontSize: '13px',
                        }}
                      >
                        パスワードを忘れた場合
                      </Link>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      sx={{ marginTop: '20px', backgroundColor: '#DD5371' }}
                      onClick={handleSubmit}
                    >
                      ログイン
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  marginTop: '-20px',
                }}
                onClick={() => {
                  navigate('/register');
                }}
              >
                <Link
                  to="/register"
                  sx={{
                    textDecoration: 'none',
                    cursor: 'pointer',
                    color: '#DD5371',
                  }}
                >
                  アカウントを作成
                  <ArrowRightAltIcon
                    style={{ position: 'relative', top: '6px' }}
                  />
                </Link>
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
