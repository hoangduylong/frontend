import { useState, useEffect } from 'react';
import {
  InputLabel,
  Input,
  Box,
  Button,
  Snackbar,
  Alert,
  Modal,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

import axiosClient from '../../api/axios';
import Loading from '../../components/loading/Loading';

function Profile() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isErrorSnackbarMessage, setIsErrorSnackbarMessage] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [passwordObject, setPasswordObject] = useState({});
  const navigate = useNavigate();
  const id = useSelector((state) => {
    return state.id;
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePasswordObjectChange = (event) => {
    setPasswordObject({
      ...passwordObject,
      [event.target.name]: event.target.value,
    });
  };

  const handleUserChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleEdit = () => {
    axiosClient
      .put(`/auth/profile`, { ...user, id: id })
      .then(() => {
        setSnackbarMessage('編集成功');
        setIsErrorSnackbarMessage(false);
        setShowSnackbar(true);
        setTimeout(() => {
          setShowSnackbar(false);
        }, 1000);
      })
      .catch((err) => {
        setSnackbarMessage(err.response.data.message);
        setIsErrorSnackbarMessage(true);
        setShowSnackbar(true);
      });
  };

  const handleUpdatePassword = () => {
    axiosClient
      .post(`auth/update-password`, { ...passwordObject, id: id })
      .then(() => {
        setSnackbarMessage('パスワードアップデート');
        setIsErrorSnackbarMessage(false);
        setShowSnackbar(true);
        setTimeout(() => {
          setShowSnackbar(false);
        }, 1000);
      })
      .catch((err) => {
        setSnackbarMessage(err.response.data.message);
        setIsErrorSnackbarMessage(true);
        setShowSnackbar(true);
      });
    handleClose();
  };

  const handleLogout = () => {
    setSnackbarMessage('ログアウト');
    setIsErrorSnackbarMessage(false);
    setShowSnackbar(true);
    setTimeout(() => {
      localStorage.clear();
      window.location.reload();
    }, 1000);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  useEffect(() => {
    setIsLoading(true);
    axiosClient
      .post(`/auth/profile`, {
        id: id,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, [id, navigate]);

  return (
    <Box>
      <Box
        sx={{
          color: '#DD5371',
          textAlign: 'center',
          padding: '100px 0px',
          fontSize: '50px',
          fontWeight: 'bold',
        }}
      >
        プロフィール
      </Box>
      <form
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
            }}
          >
            {!isLoading ? (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '40px',
                  }}
                >
                  <Box>
                    <Box sx={{ paddingY: '20px' }}>
                      <InputLabel
                        sx={{ fontSize: '20px', fontWeight: 'bold' }}
                        htmlFor="name"
                      >
                        名前
                      </InputLabel>
                      <Input
                        type="text"
                        sx={{ width: '300px' }}
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleUserChange}
                      />
                    </Box>
                    <Box sx={{ paddingY: '20px' }}>
                      <InputLabel
                        sx={{ fontSize: '20px', fontWeight: 'bold' }}
                        htmlFor="email"
                      >
                        メールアドレス
                      </InputLabel>
                      <Input
                        type="text"
                        sx={{ width: '300px' }}
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleUserChange}
                        readOnly
                      />
                    </Box>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            backgroundColor: 'background.paper',
                            boxShadow: 24,
                            p: 6,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <Box sx={{ paddingY: '15px' }}>
                            <InputLabel
                              sx={{ fontSize: '20px', fontWeight: 'bold' }}
                              htmlFor="current-password"
                            >
                              現在のパスワード
                            </InputLabel>
                            <Input
                              type="password"
                              required
                              placeholder="現在のパスワードを入力してください"
                              sx={{ width: '300px' }}
                              id="current-password"
                              name="current_password"
                              onChange={handlePasswordObjectChange}
                            />
                          </Box>
                          <Box sx={{ paddingY: '15px' }}>
                            <InputLabel
                              sx={{ fontSize: '20px', fontWeight: 'bold' }}
                              htmlFor="new-password"
                            >
                              新しいパスワード
                            </InputLabel>
                            <Input
                              type="password"
                              required
                              placeholder="新しいパスワードを入力してください"
                              sx={{ width: '300px' }}
                              id="new-password"
                              name="new_password"
                              onChange={handlePasswordObjectChange}
                            />
                          </Box>
                          <Box sx={{ paddingY: '15px' }}>
                            <InputLabel
                              sx={{ fontSize: '20px', fontWeight: 'bold' }}
                              htmlFor="confirm-password"
                            >
                              確認パスワード
                            </InputLabel>
                            <Input
                              type="password"
                              required
                              placeholder="確認パスワードを入力してください"
                              sx={{ width: '300px' }}
                              id="confirm-password"
                              name="new_password_confirmation"
                              onChange={handlePasswordObjectChange}
                            />
                          </Box>
                          <Box
                            sx={{
                              paddingTop: '20px',
                            }}
                          >
                            <Button
                              variant="outlined"
                              onClick={handleUpdatePassword}
                            >
                              アップデート
                            </Button>
                          </Box>
                        </Box>
                      </Modal>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    paddingX: '40px',
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleEdit}
                    sx={{ width: '100px', padding: '10px' }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleOpen}
                    sx={{ width: '100px', padding: '10px' }}
                  >
                    <PublishedWithChangesIcon />
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleLogout}
                    sx={{ width: '100px', padding: '10px' }}
                  >
                    <LogoutIcon />
                  </Button>
                </Box>
              </>
            ) : (
              <Loading />
            )}
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
        </Box>
      </form>
    </Box>
  );
}

export default Profile;
