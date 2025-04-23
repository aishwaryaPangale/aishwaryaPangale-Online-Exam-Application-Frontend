import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const StudentReport = () => {
  const [summary, setSummary] = useState({ attended: 0, notAttended: 0, scores: [] });

  useEffect(() => {
    const fetchReport = async () => {
      const username = localStorage.getItem("username");
      const res = await axios.get(`http://localhost:8081/api/student/report/summary?username=${username}`);
      setSummary(res.data);
      console.log("Summary data:", res.data);
    };
    fetchReport();
  }, []);

  const pieData = {
    labels: ['Attended', 'Not Attended'],
    datasets: [{
      data: [summary.attended, summary.notAttended],
      backgroundColor: ['#4caf50', '#f44336']
    }]
  };

  const pieOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  const barData = {
    labels: summary.scores.map((item, index) => `Test ${index + 1}`),
    datasets: [{
      label: 'Score',
      data: summary.scores.map(item => parseInt(item.total_marks)),
      backgroundColor: '#2196f3'
    }]
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100 // Adjust if needed
      }
    }
  };

  return (
    <div className="container shadow-lg p-4 rounded position-absolute start-50 top-50 translate-middle"
         style={{ width: "900px", height: "470px", marginTop: "50px", marginLeft: "130px" }}>
      <h4 className="text-center text-danger mb-4">Test Report</h4>
      <div className="row">
        <div className="col-md-6 d-flex flex-column align-items-center">
          <h6 className="text-center">Test Attendance</h6>
          <div style={{ width: '100%', height: '250px' }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
        <div className="col-md-6">
          <h6 className="text-center">Scores per Test</h6>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default StudentReport;
