import React from 'react';
import {Line} from '@ant-design/plots';


// this part is just for showing mock data and there is not api for it
const ChartCreator = () => {

    const data = [
        {
            date: '01/04',
            events: 3,
        },
        {
            date: '01/05',
            events: 4,
        },
        {
            date: '01/06',
            events: 4,
        },
        {
            date: '01/07',
            events: 5,
        },
        {
            date: '01/08',
            events: 5,
        },
        {
            date: '01/09',
            events: 6,
        },
        {
            date: '01/10',
            events: 7,
        },
        {
            date: '01/11',
            events: 9,
        },
        {
            date: '01/12',
            events: 13,
        },
    ];
    const config = {
        data,
        xField: 'date',
        yField: 'events',
        label: {},
        point: {
            size: 5,
            shape: 'diamond',
            style: {
                fill: 'white',
                stroke: '#5B8FF9',
                lineWidth: 2,
            },
        },
        tooltip: {
            showMarkers: false,
        },
        state: {
            active: {
                style: {
                    shadowBlur: 4,
                    stroke: '#000',
                    fill: 'red',
                },
            },
        },
        interactions: [
            {
                type: 'marker-active',
            },
        ],
    };
    return <Line {...config}  autoFit={true} height={200} width={200}/>;


};

export default ChartCreator;