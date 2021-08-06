import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

function Chart(props) {

    return (
        <div className="chart">
            <Bar
                data={props.chartData}
                options={{
                    title: {
                        fontSize: 25
                    }
                }}
            />

            <Line
                data={props.chartData}
                options={{
                    title: {
                        fontSize: 25
                    }
                }}
            />

            <Pie
                data={props.chartData}
                options={{
                    title: {
                        fontSize: 25
                    }
                }}
            />
        </div>
    )

}

export default Chart;