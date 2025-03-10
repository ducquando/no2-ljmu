import React from 'react';
import { Table } from "antd";
import { dataForTable, DataTableProps } from '../utils';

const columns = [
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
    },
    {
        title: 'Sensor',
        dataIndex: 'sensor',
        key: 'sensor',
    },
    {
        title: 'Time (UTC)',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'NO2 Level',
        dataIndex: 'no2',
        key: 'no2',
    },
];

export const DataTable: React.FC<DataTableProps> = ({
    measurements,
    location,
    sensorID,
}) => {
    const dataSource = dataForTable(measurements, location, sensorID);
    
    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 5 }}
        />
    )
}