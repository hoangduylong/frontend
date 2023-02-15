import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Button,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useTheme } from '@mui/material/styles';
import Moment from 'moment';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import ButtonAddTask from '../../components/button/ButtonAddTask';

import axiosClient from '../../api/axios';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, type, theme) {
  return {
    fontWeight:
      type.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const priorities = ['Thấp', 'Trung bình', 'Cao'];
const statuses = ['Bắt đầu', 'Đang thực hiện', 'Tạm dừng', 'Hoàn thành'];
const progresses = ['0', '20', '50', '80', '100'];

function Homepage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [filterStartTime, setFilterStartTime] = useState(null);
  const [filterEndTime, setFilterEndTime] = useState(null);
  const [filterPriority, setFilterPriority] = useState('');
  const [filterProgress, setFilterProgress] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterText, setFilterText] = useState('');
  const navigate = useNavigate();
  const columns = [
    { id: 'title', label: 'Tiêu đề', minWidth: 100 },
    { id: 'description', label: 'Mô tả', minWidth: 300 },
    { id: 'priority', label: 'Độ ưu tiên', minWidth: 50 },
    { id: 'progress', label: 'Tiến độ（％）', minWidth: 50 },
    { id: 'start_time', label: 'Thời hạn', minWidth: 100 },
    { id: 'status', label: 'Trạng thái', minWidth: 50 },
  ];
  let data = null;
  const handleFilterStartTimeChange = (value) => {
    setFilterStartTime(value);
  };

  const handlerRedirectTaskDetail = (id) => {
    navigate(`/tasks/${id}`);
  };

  const handleFilterEndTimeChange = (value) => {
    setFilterEndTime(value);
  };

  const handleFilterProgressChange = (e) => {
    setFilterProgress(e.target.value);
  };

  const handleFilterStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleFilterTextChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleFilterPriorityChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilterPriority(value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClearFilter = () => {
    setFilterStartTime(null);
    setFilterEndTime(null);
    setFilterProgress('');
    setFilterStatus('');
    setFilterText('');
    setFilterPriority('');
  };

  useEffect(() => {
    axiosClient
      .get('/tasks')
      .then((res) => {
        data = [...res.data]
        data.map((item, index) => {
          if(item.priority === '低い') {
          item.priority = 'Thấp'
        }

        if(item.priority === '中') {
          item.priority = 'Trung bình'
        }

        if(item.priority === '高い') {
          item.priority = 'Cao'
        }

        if(item.status === 'トド') {
          item.status = 'Bắt đầu'
        }
        if(item.status === '進行中') {
          item.status = 'Đang thực hiện'
        }
        if(item.status === 'ペンディング') {
          item.status = 'Tạm dừng'
        }
        if(item.status === '完了') {
          item.status = 'Hoàn thành'
        }
        return item;
        })
        setRows(res.data.filter(task => task.deleted));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box
      sx={{
        width: '80%',
        margin: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* <ButtonAddTask /> */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <FormControl sx={{ m: 1, width: 120 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  value={filterStartTime}
                  onChange={handleFilterStartTimeChange}
                  label="Bắt đầu"
                  ampm={false}
                  inputFormat="DD/MM/YYYY HH:mm"
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      size="small"
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
          <Box>
            <FormControl sx={{ m: 1, width: 150 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  value={filterEndTime}
                  onChange={handleFilterEndTimeChange}
                  label="Kết thúc"
                  ampm={false}
                  inputFormat="DD/MM/YYYY HH:mm"
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      size="small"
                      inputProps={{
                        ...props.inputProps,
                        placeholder: 'DD/MM/YYYY HH:mm',
                      }}
                    />
                  )}
                  place
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
          <Box>
            <FormControl sx={{ m: 1, width: 120 }} size="small">
              <InputLabel id="filter-task-name-label">Độ ưu tiên</InputLabel>
              <Select
                labelId="filter-task-name-label"
                id="filter-task-name"
                onChange={handleFilterPriorityChange}
                input={<OutlinedInput label="Độ ưu tiên" />}
                MenuProps={MenuProps}
                value={filterPriority}
              >
                {priorities.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, filterPriority, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl sx={{ m: 1, width: 130 }} size="small">
              <InputLabel id="filter-task-value-label">Tiến độ（％）</InputLabel>
              <Select
                labelId="filter-task-value-label"
                id="filter-task-value"
                onChange={handleFilterProgressChange}
                input={<OutlinedInput label="Tiến độ（％）" />}
                MenuProps={MenuProps}
                value={filterProgress}
              >
                {progresses.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, filterProgress, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl sx={{ m: 1, width: 120 }} size="small">
              <InputLabel id="filter-task-value-label">Trạng thái</InputLabel>
              <Select
                labelId="filter-task-value-label"
                id="filter-task-value"
                onChange={handleFilterStatusChange}
                input={<OutlinedInput label="Trạng thái" />}
                MenuProps={MenuProps}
                value={filterStatus}
              >
                {statuses.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, filterStatus, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl sx={{ m: 1, width: 100 }} size="small">
              <TextField
                id="outlined-basic"
                label="Tìm kiếm"
                variant="outlined"
                size="small"
                name="outlined-basic"
                value={filterText}
                onChange={handleFilterTextChange}
              />
            </FormControl>
          </Box>
          <Box>
            <Button
              variant="text"
              sx={{
                color: '#183A4A',
                backgroundColor: 'white',
                border: '1px solid #eeeee4',
              }}
              onClick={handleClearFilter}
            >
              <ClearIcon
                style={{
                  fontSize: '28px',
                  color: '#DD5371',
                }}
              />
            </Button>
          </Box>
        </Box>
      </Box>
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableRow
              sx={{
                backgroundColor: '#DD5371',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    top: 57,
                    minWidth: column.minWidth,
                    fontWeight: 'bold',
                    fontSize: '20px',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
            <TableBody>
              {rows
                .filter((row) => {
                  if (
                    filterStartTime !== null &&
                    Date.parse(filterStartTime) > Date.parse(row.start_time)
                  ) {
                    return false;
                  }

                  if (
                    filterEndTime !== null &&
                    Date.parse(filterEndTime) < Date.parse(row.start_time)
                  ) {
                    return false;
                  }

                  if (
                    filterPriority !== '' &&
                    row.priority !== filterPriority
                  ) {
                    return false;
                  }

                  if (
                    filterProgress !== '' &&
                    Number(row.progress) !== Number(filterProgress)
                  ) {
                    return false;
                  }

                  if (filterStatus !== '' && row.status !== filterStatus) {
                    return false;
                  }

                  if (
                    row.title.indexOf(filterText) === -1 &&
                    row.description.indexOf(filterText) === -1
                  ) {
                    return false;
                  }

                  return true;
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handlerRedirectTaskDetail(row.id)}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell>
                            {column.id !== 'start_time'
                              ? value
                              : Moment(value).format('DD/MM/YYYY hh:mm')}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={
            rows.filter((row) => {
              if (
                filterStartTime !== null &&
                Date.parse(filterStartTime) > Date.parse(row.start_time)
              ) {
                return false;
              }

              if (
                filterEndTime !== null &&
                Date.parse(filterEndTime) < Date.parse(row.start_time)
              ) {
                return false;
              }

              if (
                row.title.indexOf(filterText) === -1 &&
                row.description.indexOf(filterText) === -1
              ) {
                return false;
              }

              if (filterPriority !== '' && row.priority !== filterPriority) {
                return false;
              }

              if (filterProgress !== '' && row.progress !== filterProgress) {
                return false;
              }

              if (filterStatus !== '' && row.status !== filterStatus) {
                return false;
              }
              return true;
            }).length
          }
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default Homepage;
