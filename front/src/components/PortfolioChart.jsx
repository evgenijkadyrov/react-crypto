import React from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {useCrypto} from "../hooks/hooks.js";

ChartJS.register(ArcElement, Tooltip, Legend);


export const PortfolioChart = () => {
    const {assets}=useCrypto()

    const data = {
        labels: assets.map(el=>el.name),
        datasets: [
            {
                label: '$',
                data: assets.map(el=>el.totalAmount),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div style={{height:'500px', display:'flex', justifyContent:'center', marginTop:'20px'}}>
<Pie data={data}/>
        </div>
    );
};

