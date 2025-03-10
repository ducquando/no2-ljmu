import React from 'react';
import { DatePicker } from "antd";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { DATE_FORMATS, DateSelectorProps } from '../utils';

dayjs.extend(utc);

export const DateSelector: React.FC<DateSelectorProps> = ({
    date,
    setToday,
    setYesterday,
}) => {
    const setDate = (newDate?: dayjs.Dayjs) => {
        const currentTime = dayjs.utc().startOf('hour');
        if (!newDate) return;

        if (newDate.isAfter(currentTime)) {
            newDate = currentTime;
        }

        if (date !== newDate) {
            setToday(newDate);
            setYesterday(newDate.subtract(1, 'day').startOf('hour'));
        }
    }

    return (
        <DatePicker
            defaultValue={date}
            maxDate={dayjs.utc()}
            onChange={setDate}
            format={DATE_FORMATS.CALENDAR}
        />
    )
}