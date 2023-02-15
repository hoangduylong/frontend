import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components'
import axiosClient from '../../api/axios';

const ChartStyled = styled.div`
  width: 100vw;
  display: flex;

  .chart {
    position: relative;
    padding: 16px;

    .children {
      width: 500px;
    }
    span {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 20px;
      font-size: 20px;
      width: max-content;
    }
  }

  .advices {
    padding: 10px;
    width: calc(100vw - 400px);

    .part {
      width: 100%;
      height: 250px;
      border: 1px solid rgba(0, 0, 0, 0.3);
      margin-bottom: 8px;

      .title {
        height: 50px;
        width: 100%;
        border-top: 4px solid green;
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        padding: 12px;
        box-sizing: border-box;
        text-align: center;
        font-size: 20px;
      }
      .body {
        padding: 16px 32px;
        font-size: 20px;
      }
    }
  }
`

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskPieChart = () => {
  const [taskList, setTaskList] = useState([{priority: null}]);
  const [message, setMessage] = useState("");

  const loiNhac = (list) => {
    const high = list.filter(task => task.priority === 'Cao').length;
    const low = list.filter(task => task.priority === 'Thấp').length;
    const medium = list.filter(task => task.priority === 'Trung bình').length;
    const totalMax = Math.max(high, low, medium);

    if (totalMax === high) return "Bạn có quá nhiều task ựu tiên. \nHãy tập trung giải quyết để không bị quá hạn !!!"
    if (totalMax === low) return "Bạn có khá nhiều task mức độ ưu tiên thấp. \nHãy chill đi"
    return "Mức độ task trung bình là nhiều nhất. \nHãy cân đối thời gian để thực hiện công việc cho phù hợp"
  }
  useEffect(() => {
    axiosClient.get("/tasks")
    .then(res => {
      setTaskList(res.data.filter(task => !task.deleted));
      setMessage(loiNhac(res.data.filter(task => !task.deleted)))
    })
  }, [])

  const labels = Array.from(new Set(taskList.map(task => task.priority)));
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'hello',
      },
    },
  };
  const dataSetting = {
    labels,
    datasets: [{
      label: '# of Votes',
      data: labels.map(label => (taskList.filter(task => task.priority === label).length / taskList.length*100).toFixed(2)),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    }]
  }


  return <ChartStyled> 
    <div className='chart'>
      <div className='children'>
        <span><strong>Biểu đồ thống kê mức độ công việc</strong></span>
        <Pie options={options} data={dataSetting} />
      </div>
    </div>

    <div className='advices'>
      <div className='part'>
        <div className="title"><strong>Thống kê</strong></div>
        <div className="body">
          <ul>
            {labels.map(label => (
              <li>{label}: {taskList.filter(task => task.priority === label).length}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className='part'>
        <div className="title"><strong>Lời nhắc</strong></div>
        <div className="body">
          <h3><i style={{color: "darkorange"}}>{message}</i></h3>
        </div>
      </div>
    </div>
  </ChartStyled>
}

export default TaskPieChart