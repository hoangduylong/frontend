import React, { useState } from 'react';
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
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from 'react-router-dom';

import axiosClient from '../../../api/axios';

function UpdateTask() {
  const [startTime, setStartTime] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('');
  const [progress, setProgress] = useState('');
  const [status, setStatus] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isErrorSnackbarMessage, setIsErrorSnackbarMessage] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();
  const store = JSON.parse(localStorage.getItem('store'));

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleStartTimeChange = (value) => {
    setStartTime(value);
  };

  const handleProgressChange = (e) => {
    setProgress(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = () => {
    axiosClient
      .post('/tasks', {
        title,
        description,
        content,
        start_time: startTime,
        priority,
        progress,
        status,
        user_id: store.id,
      })
      .then(() => {
        setSnackbarMessage('タスク追加成功');
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

  return (
    <Box sx={{ padding: '50px 0' }}>
      <Box
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '50px',
          color: '#DD5371',
        }}
      >
        追加
      </Box>
      <Box>
        <Box sx={{ width: '80%', margin: '30px auto' }}>
          <InputLabel
            sx={{ fontSize: '30px', fontWeight: 'bold' }}
            htmlFor="タイトル"
          >
            タイトル
          </InputLabel>
          <Input
            type="text"
            placeholder="タイトルを入力してください"
            required
            sx={{ width: '100%' }}
            id="title"
            name="title"
            onChange={handleTitleChange}
          />
        </Box>
        <Box sx={{ width: '80%', margin: '30px auto' }}>
          <InputLabel
            sx={{ fontSize: '30px', fontWeight: 'bold' }}
            htmlFor="デスクリプション"
          >
            デスクリプション
          </InputLabel>
          <TextField
            id="description"
            name="description"
            multiline
            rows={2}
            sx={{ width: '100%' }}
            placeholder="デスクリプションを入力してください"
            onChange={handleDescriptionChange}
          />
        </Box>
        <Box sx={{ width: '80%', margin: '30px auto' }}>
          <InputLabel
            sx={{ fontSize: '30px', fontWeight: 'bold' }}
            htmlFor="内容"
          >
            内容
          </InputLabel>
          <TextField
            id="content"
            name="content"
            onChange={handleContentChange}
            multiline
            rows={6}
            sx={{ width: '100%' }}
            placeholder="内容を入力してください"
          />
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
              <InputLabel id="demo-simple-select-label">優先</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="demo-simple-select"
                label="優先"
                onChange={handlePriorityChange}
              >
                <MenuItem value="低い">低い</MenuItem>
                <MenuItem value="中">中</MenuItem>
                <MenuItem value="高い">高い</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ width: '20%' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">進捗（％）</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="demo-simple-select"
                onChange={handleProgressChange}
                label="進捗（％）"
              >
                <MenuItem value="0">0</MenuItem>
                <MenuItem value="20">20</MenuItem>
                <MenuItem value="50">50</MenuItem>
                <MenuItem value="80">80</MenuItem>
                <MenuItem value="100">100</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ width: '20%' }}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  value={startTime}
                  onChange={handleStartTimeChange}
                  label="開始"
                  ampm={false}
                  inputFormat="DD/MM/YYYY HH:mm"
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      onChange={handleStartTimeChange}
                      inputProps={{
                        ...props.inputProps,
                        placeholder: 'DD/MM/YYYY HH:mm',
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
          <Box sx={{ width: '20%' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">状態</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="demo-simple-select"
                label="状態"
                onChange={handleStatusChange}
              >
                <MenuItem value="トド">トド</MenuItem>
                <MenuItem value="進行中">進行中</MenuItem>
                <MenuItem value="ペンディング">ペンディング</MenuItem>
                <MenuItem value="完了">完了</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#DD5371',
          }}
          onClick={handleSubmit}
        >
          <Box
            sx={{
              fontSize: '15px',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            追加
          </Box>
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
    </Box>
  );
}

export default UpdateTask;
