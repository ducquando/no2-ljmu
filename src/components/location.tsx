import React from 'react';
import { Select } from "antd";
import { LocationSelecterProps } from '../utils';

export const LocationSelecter: React.FC<LocationSelecterProps> = ({
    locationID,
    setLocationID,
}) => {
    const options = [
        {
            value: 2533,
            label: "Wirral Tranmere - UKA00406",
        }
    ]

    const onChange = (newLocationID?: number) => {
        if (!newLocationID) return;
        setLocationID(newLocationID);
    }

    return (
        <Select
            showSearch
            placeholder="Select a location"
            optionFilterProp="label"
            defaultValue={locationID}
            onChange={onChange}
            options={options}
        />
    )
}