import React, { useState, useEffect } from 'react';
import {
  Box,
  Input,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DeleteIcon from '@mui/icons-material/Delete';

import axiosClient from '../../../api/axios';

function TaskDetail() {
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isErrorSnackbarMessage, setIsErrorSnackbarMessage] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState({});
  const store = JSON.parse(localStorage.getItem('store'));
  const params = useParams();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleTaskChange = (e) => {
    if (e.target === undefined) {
      setTask({ ...task, start_time: e });
      return;
    }
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleDeleteTask = () => {
    handleClose();
    axiosClient
      .delete(`/tasks/${params.id}`)
      .then(() => {
        setSnackbarMessage('タスクアップデート成功');
        setIsErrorSnackbarMessage(false);
        setShowSnackbar(true);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    axiosClient
      .put(`/tasks/${params.id}`, {
        title: task.title,
        description: task.description,
        content: task.content,
        start_time: task.start_time,
        priority: task.priority,
        progress: task.progress,
        status: task.status,
        user_id: store.id,
      })
      .then(() => {
        setSnackbarMessage('タスクアップデート成功');
        setIsErrorSnackbarMessage(false);
        setShowSnackbar(true);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axiosClient
      .get(`/tasks/${params.id}`)
      .then((res) => {
        setTask(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  return (
    <Box sx={{ padding: '50px 0' }}>
      <Box
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '50px',
          color: '#DD5371',
          width: '80%',
          margin: 'auto',
          position: 'relative',
        }}
      >
        {!isEditMode ? 'ディテール' : 'アップデート'}
        <Button
          sx={{ position: 'absolute', right: '0' }}
          onClick={handleClickOpen}
        >
          <DeleteIcon style={{ color: '#DD5371', fontSize: '30px' }} />
        </Button>
      </Box>
      <Box>
        <Box sx={{ width: '80%', margin: '30px auto' }}>
          <InputLabel
            sx={{ fontSize: '30px', fontWeight: 'bold' }}
            htmlFor="タイトル"
          >
            タイトル
          </InputLabel>
          {!isEditMode ? (
            <Input
              type="text"
              placeholder="タイトルを入力してください"
              required
              sx={{ width: '100%' }}
              id="title"
              name="title"
              value={task.title}
              disabled
            />
          ) : (
            <Input
              type="text"
              placeholder="タイトルを入力してください"
              required
              sx={{ width: '100%' }}
              id="title"
              name="title"
              value={task.title}
              onChange={handleTaskChange}
            />
          )}
        </Box>
        <Box sx={{ width: '80%', margin: '30px auto' }}>
          <InputLabel
            sx={{ fontSize: '30px', fontWeight: 'bold' }}
            htmlFor="デスクリプション"
          >
            デスクリプション
          </InputLabel>
          {!isEditMode ? (
            <TextField
              id="description"
              name="description"
              multiline
              rows={2}
              sx={{ width: '100%' }}
              placeholder="デスクリプションを入力してください"
              disabled
              value={task.description}
            />
          ) : (
            <TextField
              id="description"
              name="description"
              multiline
              rows={2}
              sx={{ width: '100%' }}
              placeholder="デスクリプションを入力してください"
              value={task.description}
              onChange={handleTaskChange}
            />
          )}
        </Box>
        <Box sx={{ width: '80%', margin: '30px auto' }}>
          <InputLabel
            sx={{ fontSize: '30px', fontWeight: 'bold' }}
            htmlFor="内容"
          >
            内容
          </InputLabel>
          {!isEditMode ? (
            <TextField
              id="content"
              name="content"
              multiline
              rows={6}
              sx={{ width: '100%' }}
              placeholder="内容を入力してください"
              disabled
              value={task.content}
            />
          ) : (
            <TextField
              id="content"
              name="content"
              multiline
              rows={6}
              sx={{ width: '100%' }}
              placeholder="内容を入力してください"
              value={task.content}
              onChange={handleTaskChange}
            />
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '80%',
            margin: '30px auto',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ width: '20%' }}>
            <FormControl fullWidth>
              <InputLabel id="priority-select-label">優先</InputLabel>
              {!isEditMode ? (
                <Select
                  labelId="priority-select-label"
                  id="priority"
                  name="priority"
                  label="優先"
                  value={task.priority ? task.priority : ''}
                  disabled
                >
                  <MenuItem value="低い">低い</MenuItem>
                  <MenuItem value="中">中</MenuItem>
                  <MenuItem value="高い">高い</MenuItem>
                </Select>
              ) : (
                <Select
                  labelId="priority-select-label"
                  id="priority"
                  name="priority"
                  label="優先"
                  value={task.priority ? task.priority : ''}
                  onChange={handleTaskChange}
                >
                  <MenuItem value="低い">低い</MenuItem>
                  <MenuItem value="中">中</MenuItem>
                  <MenuItem value="高い">高い</MenuItem>
                </Select>
              )}
            </FormControl>
          </Box>
          <Box sx={{ width: '20%' }}>
            <FormControl fullWidth>
              <InputLabel id="progress-select-label">進捗（％）</InputLabel>
              {!isEditMode ? (
                <Select
                  labelId="progress-select-label"
                  id="progress"
                  name="progress"
                  label="進捗（％）"
                  disabled
                  value={task.progress ? task.progress : ''}
                >
                  <MenuItem value="0">0</MenuItem>
                  <MenuItem value="20">20</MenuItem>
                  <MenuItem value="50">50</MenuItem>
                  <MenuItem value="80">80</MenuItem>
                  <MenuItem value="100">100</MenuItem>
                </Select>
              ) : (
                <Select
                  labelId="progress-select-label"
                  id="progress"
                  name="progress"
                  label="進捗（％）"
                  value={task.progress ? task.progress : ''}
                  onChange={handleTaskChange}
                >
                  <MenuItem value="0">0</MenuItem>
                  <MenuItem value="20">20</MenuItem>
                  <MenuItem value="50">50</MenuItem>
                  <MenuItem value="80">80</MenuItem>
                  <MenuItem value="100">100</MenuItem>
                </Select>
              )}
            </FormControl>
          </Box>
          <Box sx={{ width: '20%' }}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {!isEditMode ? (
                  <DateTimePicker
                    value={task.start_time ? task.start_time : null}
                    label="開始"
                    ampm={false}
                    inputFormat="DD/MM/YYYY HH:mm"
                    onChange={handleTaskChange}
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        inputProps={{
                          ...props.inputProps,
                          placeholder: 'DD/MM/YYYY HH:mm',
                        }}
                      />
                    )}
                    disabled
                  />
                ) : (
                  <DateTimePicker
                    label="開始"
                    ampm={false}
                    inputFormat="DD/MM/YYYY HH:mm"
                    value={task.start_time ? task.start_time : null}
                    onChange={handleTaskChange}
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        inputProps={{
                          ...props.inputProps,
                          placeholder: 'DD/MM/YYYY HH:mm',
                        }}
                      />
                    )}
                  />
                )}
              </LocalizationProvider>
            </FormControl>
          </Box>
          <Box sx={{ width: '20%' }}>
            <FormControl fullWidth>
              <InputLabel id="status-select-label">状態</InputLabel>
              {!isEditMode ? (
                <Select
                  labelId="status-select-label"
                  id="status"
                  name="status"
                  label="状態"
                  disabled
                  value={task.status ? task.status : ''}
                >
                  <MenuItem value="トド">トド</MenuItem>
                  <MenuItem value="進行中">進行中</MenuItem>
                  <MenuItem value="ペンディング">ペンディング</MenuItem>
                  <MenuItem value="完了">完了</MenuItem>
                </Select>
              ) : (
                <Select
                  labelId="status-select-label"
                  id="status"
                  name="status"
                  label="状態"
                  value={task.status ? task.status : ''}
                  onChange={handleTaskChange}
                >
                  <MenuItem value="トド">トド</MenuItem>
                  <MenuItem value="進行中">進行中</MenuItem>
                  <MenuItem value="ペンディング">ペンディング</MenuItem>
                  <MenuItem value="完了">完了</MenuItem>
                </Select>
              )}
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}
      >
        <Button
          variant="outlined"
          sx={{
            color: '#DD5371',
            backgroundColor: 'white',
            border: '1px solid #DD5371',
            width: '200px',
            fontSize: '20px',
          }}
          onClick={!isEditMode ? handleChangeEditMode : handleSubmit}
        >
          {!isEditMode ? '編集' : '保存'}
        </Button>
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          タスクをデリートする？
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            実施した後で元に戻ることができない。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleDeleteTask} autoFocus>
            確認
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default TaskDetail;
