import React, { useEffect, useState } from 'react';
import { Typography, Card } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { DataTable, DateSelector, DataChart, StatsCard, LocationSelecter } from './components';
import { LocationProps, MeasurementsProps, DATE_FORMATS } from './utils';
import locationFallback from './data/location.json';
import measurementsFallback from './data/measurements.json';

dayjs.extend(utc);

const corsProxy = process.env.REACT_APP_PROXY || '';

const App: React.FC = () => {
    // LOCATION
    const [locationID, setLocationID] = useState<number>(2533);
    const [sensorID, setSensorID] = useState<number>(5022);

    // TIME
    const [today, setToday] = useState(dayjs.utc().startOf('hour'));
    const [yesterday, setYesterday] = useState(dayjs.utc().startOf('hour').subtract(1, 'day'));

    // DATA
    const [measurementData, setMeasurementData] = useState<MeasurementsProps>(measurementsFallback.results);
    const [locationData, setLocationData] = useState<LocationProps>(locationFallback.results[0]);

    // Fetch location data
    useEffect(() => {
        fetch(`${corsProxy}https://api.openaq.org/v3/locations/${locationID}`, {
            method: 'GET',
            headers: {
                'X-API-Key': '3f247d3fd8306651868fc98a6de230e38d18ae5c7946b06741428a42b2413579',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setLocationData(data.results[0]);
            })
            .catch((error) => {
                console.error(error);
                throw new Error('Failed to parse data from OpenAQ API');
            })
    }, [locationID]);

    // Fetch sensor id
    useEffect(() => {
        if (locationData) {
            const no2Sensor = locationData.sensors.find((sensor) => sensor.name === 'no2 µg/m³');
            setSensorID(s => no2Sensor?.id || s);
        }
    }, [locationData]);

    // Fetch measurement data
    useEffect(() => {
        const yesterdayTime = yesterday.format(DATE_FORMATS.API);
        const todayTime = today.format(DATE_FORMATS.API);

        fetch(`${corsProxy}https://api.openaq.org/v3/sensors/${sensorID}/measurements?datetime_from=${yesterdayTime}&datetime_to=${todayTime}`, {
            method: 'GET',
            headers: {
                'X-API-Key': '3f247d3fd8306651868fc98a6de230e38d18ae5c7946b06741428a42b2413579',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setMeasurementData(data.results);
            })
    }, [sensorID, today, yesterday]);

    return (
        <div style={{ padding: '20px 50px', display: 'flex', flexDirection: 'column', gap: '24px', }}>
            <header style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Typography.Title level={1}>NO2 Data Readings</Typography.Title>
                <Typography.Text type="secondary">All times are in UTC</Typography.Text>
            </header>
            <Card 
                title="Location"
                extra={<LocationSelecter locationID={locationID} setLocationID={setLocationID} />}
            >
                <Typography.Title level={3} style={{ margin: '0px 0px 8px' }}>{locationData.name}</Typography.Title>
                <Typography.Title level={4} style={{ margin: '8px 0px 0px' }}>{locationData.locality}, {locationData.country.name}</Typography.Title>
            </Card>
            <Card
                title="Data Readings"
                extra={<DateSelector date={today} setToday={setToday} setYesterday={setYesterday} />}
            >
                <Card.Grid hoverable={false} style={{ width: '100%' }}>
                    <StatsCard measurements={measurementData} />
                </Card.Grid>
                <Card.Grid hoverable={false} style={{ width: '100%', height: '400px' }}>
                    <DataChart measurements={measurementData} endTime={today} startTime={yesterday} />
                </Card.Grid>
                <Card.Grid hoverable={false} style={{ width: '100%' }}>
                    <DataTable location={locationData} measurements={measurementData} sensorID={sensorID} />
                </Card.Grid>
            </Card>
            <header style={{ textAlign: 'center', marginTop: '20px' }}>
                <Typography.Text type="secondary">Author: Duc-Quan Do, 2025</Typography.Text>
            </header>
        </div>
    );
}

export default App;
