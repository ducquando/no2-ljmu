import React from 'react';
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, ReferenceLine } from 'recharts';
import { DataChartProps, dataForChart, dataForArray, mean, q25, q75 } from '../utils';

export const DataChart: React.FC<DataChartProps> = ({
    startTime,
    endTime,
    measurements,
}) => {
    const dataSource = dataForChart(measurements, startTime, endTime);
    const meanValue = mean(dataForArray(measurements));
    const q25Value = q25(dataForArray(measurements));
    const q75Value = q75(dataForArray(measurements));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataSource} margin={{ bottom: 20 }}>
                <defs>
                    <linearGradient id="colorNO2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />

                <XAxis dataKey="time" label={{ value: 'Hour of day', position: "insideBottom", offset: "-10" }} />
                <YAxis label={{ value: 'NO2 (µg/m³)', angle: -90, position: 'insideLeft' }} />
                <Area type="monotone" dataKey="no2" stroke="#8884d8" fillOpacity={1} fill="url(#colorNO2)" />

                <ReferenceLine y={meanValue} label="Mean" stroke="#82ca9d" />
                <ReferenceLine y={q25Value} label="Q25" stroke="#82ca9d" />
                <ReferenceLine y={q75Value} label="Q75" stroke="#82ca9d" />
            </AreaChart>
        </ResponsiveContainer>
    )
};