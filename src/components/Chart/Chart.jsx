import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          
          datasets: [
            {
              label: 'Infected',
              data: [confirmed.value],
              backgroundColor: 'rgba(51, 51, 255, 0.7)',
              
            },
            {
              label: 'Recovered',
              data: [recovered.value],
              backgroundColor: 'rgba(0, 255, 0, 0.7)',
              
            },
            {
              label: 'Deaths',
              data: [deaths.value],
              backgroundColor: 'rgba(255, 0, 0, 0.7)',
              
            },
            
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    ) : null
  );


  return (
    <div className={styles.container}>
      {country ? barChart :null}
    </div>
  );
};

export default Chart;
