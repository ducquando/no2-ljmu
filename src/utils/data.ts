import { DATE_FORMATS } from "./format";
import { LocationProps, MeasurementsProps } from "./types";
import dayjs, { Dayjs } from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const dataForTable = (measurements: MeasurementsProps, location: LocationProps, sensorID: number) => (
    measurements.map((result) => {
        const dateFormat = DATE_FORMATS.TABLE;

        return {
            location: location.name,
            city: `${location.locality}, ${location.country.name}`,
            sensor: `${sensorID}`,
            time: `${dayjs.utc(result.period.datetimeFrom.utc).format(dateFormat)} → ${dayjs.utc(result.period.datetimeTo.utc).format(dateFormat)}`,
            no2: `${result.value} ${result.parameter.units}`,
        }
    })
)

export const dataForArray = (measurements: MeasurementsProps) => (
    measurements.map((result) => result.value)
)

export const dataForChart = (measurements: MeasurementsProps, startTime: dayjs.Dayjs, endTime: dayjs.Dayjs) => {
    // Generate time intervals
    const timeIntervals = [];
    const interval = 1; // 1 hour
    let currentTime = startTime;

    while (currentTime.isBefore(endTime) || currentTime.isSame(endTime)) {
        timeIntervals.push(currentTime.format());
        currentTime = currentTime.add(interval, 'hour');
    }

    // Create a map of time intervals with default NO2 values
    type TimeInterval = { time: string, no2?: number };

    const timeFormatter = (time: string) =>
        dayjs.utc(time).isSame(dayjs.utc(time).startOf('date'))
            ? dayjs.utc(time).format(DATE_FORMATS.CHART_DATE)
            : dayjs.utc(time).format(DATE_FORMATS.CHART_TIME);

    const timeIntervalMap = timeIntervals.reduce((acc: Record<string, TimeInterval>, time: string) => {
        acc[time] = {
            time: timeFormatter(time),
        };
        return acc;
    }, {});

    // Merge measurement data with time intervals
    measurements.forEach((result) => {
        const time = dayjs.utc(result.period.datetimeTo.utc).format();
        if (timeIntervalMap[time]) {
            timeIntervalMap[time].no2 = result.value;
        }
    });

    // Convert the map to an array
    return Object.values(timeIntervalMap);
}