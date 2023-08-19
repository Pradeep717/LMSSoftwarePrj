import React from 'react';
import { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { DarkModeContext
 } from '../../../App';
const BatchChart = ({ batchCounts }) => {
  const batches = Object.keys(batchCounts);
  const studentCounts = Object.values(batchCounts);
  const { isDarkMode } = useContext(DarkModeContext);

  const data = {
    labels: batches,
    datasets: [
      {
        label: 'Student Count per Batch',
        data: studentCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Student Count',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Batch',
        },
      },
    },
  };

  return (
    <div>
      
      <Bar data={data} options={options} />
    </div>
  );
};

export default BatchChart;
