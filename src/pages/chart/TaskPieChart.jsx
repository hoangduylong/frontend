import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components'
import axiosClient from '../../api/axios';

const ChartStyled = styled.div`
  width: 100vw;
  position: relative;

  .children {
    width: 500px;
    margin: 0 auto;
  }
`

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskPieChart = () => {
  const [taskList, setTaskList] = useState([{priority: null}]);
  useEffect(() => {
    axiosClient.get("/tasks")
    .then(res => {
      setTaskList(res.data);
    })
  }, [])

  // const taskList = [
  //   {
  //     priority: "LOW"
  //   },
  //   {
  //     priority: "MEDIUM"
  //   },
  //   {
  //     priority: "HIGH"
  //   },
  //   {
  //     priority: "LOW"
  //   },
  //   {
  //     priority: "LOW"
  //   },
  //   {
  //     priority: "HIGH"
  //   },
  //   {
  //     priority: "MEDIUM"
  //   },
  //   {
  //     priority: "MEDIUM"
  //   },
  //   {
  //     priority: "HIGH"
  //   },
  //   {
  //     priority: "LOW"
  //   },
  //   {
  //     priority: "HIGH"
  //   },
  //   {
  //     priority: "HIGH"
  //   },
  //   {
  //     priority: "LOW"
  //   },
  //   {
  //     priority: "LOW"
  //   },
  //   {
  //     priority: "LOW"
  //   },
  //   {
  //     priority: "LOW"
  //   },
  //   {
  //     priority: "LOW"
  //   },
  //   {
  //     priority: "MEDIUM"
  //   }
  // ]

  const labels = Array.from(new Set(taskList.map(task => task.priority)));
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: "hello",
        position: "top"
      },
    },
  };
  const dataSetting = {
    labels,
    datasets: [{
      label: '# of Votes',
      data: labels.map(label => taskList.filter(task => task.priority === label).length),
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
    <div className='children'>
      <Pie data={dataSetting} options={options} />
    </div>
  </ChartStyled>
}

export default TaskPieChart