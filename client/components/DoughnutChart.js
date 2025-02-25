'use client'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }) => {
  const data = {
    datasets: [
      {
        label: 'Banks',
        data: [1250, 2500, 3700],
        backgroundColor: ['#2857A5', '#007B4F', '#6C757D'],
      }
    ],
    labels: ['Bank A', 'Bank B']
  };

  return (
    <Doughnut
      data={data}
      options={{
        cutout: '60%',
        plugins: {
          legend: {
            display: false
          }
        }
      }}
    />
  );
}

export default DoughnutChart;
