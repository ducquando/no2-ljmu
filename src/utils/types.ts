import dayjs from 'dayjs';

export type LocationProps = { 
    id: number,
    name: string,
    locality: string,
    country: {
        id: number,
        code: string,
        name: string
    },
    sensors: {
        id: number,
        name: string,
    }[]
}

export type MeasurementsProps = { 
    value: number,
    parameter: {
        id: number,
        name: string,
        units: string,
    },
    period: {
        datetimeFrom: {
            utc: string,
            local: string
        },
        datetimeTo: {
            utc: string,
            local: string
        }
    },
}[];

export interface DataChartProps {
    measurements: MeasurementsProps;
    startTime: dayjs.Dayjs;
    endTime: dayjs.Dayjs;
}

export interface StatsCardProps {
    measurements: MeasurementsProps;
}

export interface DateSelectorProps {
    date: dayjs.Dayjs;
    setToday: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
    setTomorrow: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
}

export interface DataTableProps {
    measurements: MeasurementsProps;
    location: LocationProps;
    sensorID: number;
}

export interface LocationSelecterProps {
    locationID: number;
    setLocationID: React.Dispatch<React.SetStateAction<number>>;
}