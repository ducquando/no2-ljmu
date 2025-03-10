import React from 'react';
import { Card, Statistic, Flex } from 'antd';
import { StatsCardProps, dataForArray, mean, sum, median, q25, q75 } from '../utils';

export const StatsCard: React.FC<StatsCardProps> = ({
    measurements,
}) => {
    const dataSource = dataForArray(measurements);
    const values = {
        mean: mean(dataSource),
        sum: sum(dataSource),
        median: median(dataSource),
        q25: q25(dataSource),
        q75: q75(dataSource),
    }

    interface CardComponentProps {
        title: string;
        value: number;
    }

    const CardComponent: React.FC<CardComponentProps> = ({ title, value }) => (
        <Card style={{ padding: 16 }}>
            <Statistic title={title} value={value.toFixed(2)} suffix="µg/m³" />
        </Card>
    );

    return (
        <Flex wrap gap="small">
            <CardComponent title="Sum" value={values.sum} />
            <CardComponent title="Average" value={values.mean} />
            <CardComponent title="Median" value={values.median} />
            <CardComponent title="Q25" value={values.q25} />
            <CardComponent title="Q75" value={values.q75} />
        </Flex>
    )
};