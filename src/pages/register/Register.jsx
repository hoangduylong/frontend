import React, { useState } from 'react';
import { Box, Button, Input, InputLabel, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

import axiosClient from '../../api/axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isErrorSnackbarMessage, setIsErrorSnackbarMessage] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
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

    if (name === '') {
      setSnackbarMessage('名前必須');
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

    if (confirmPassword === '') {
      setSnackbarMessage('パスワード認証必須');
      setIsErrorSnackbarMessage(true);
      setShowSnackbar(true);
      return;
    }

    if (password !== confirmPassword) {
      setSnackbarMessage('パスワードの確認が正しくない');
      setIsErrorSnackbarMessage(true);
      setShowSnackbar(true);
      return;
    }

    axiosClient
      .post('/auth/register', {
        name,
        email,
        password,
      })
      .then(async () => {
        setSnackbarMessage('レジスター成功');
        setIsErrorSnackbarMessage(false);
        setShowSnackbar(true);
        setTimeout(() => {
          navigate('/login');
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
                      htmlFor="email"
                    >
                      電子メイル
                    </InputLabel>
                    <Input
                      type="email"
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
                      htmlFor="name"
                    >
                      名前
                    </InputLabel>
                    <Input
                      type="text"
                      placeholder="名前を入力してください"
                      required
                      sx={{ width: '300px' }}
                      id="name"
                      onChange={handleNameChange}
                      name="name"
                    />
                  </Box>
                  <Box sx={{ paddingBottom: '30px' }}>
                    <InputLabel
                      sx={{ fontSize: '30px', fontWeight: 'bold' }}
                      htmlFor="password"
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
                      htmlFor="confirm-password"
                    >
                      パスワードを確認
                    </InputLabel>
                    <Input
                      type="password"
                      placeholder="パスワードを確認を入力してください"
                      required
                      sx={{ width: '300px' }}
                      id="confirm-password"
                      onChange={handleConfirmPasswordChange}
                      name="confirm-password"
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

export default Register;
