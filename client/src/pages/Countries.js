import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';

export const Countries = (props) => {
    const { value, setValue } = props;
    const options = useMemo(() => countryList().getData(), []);

    const selectedCountry = useMemo(() => {
        return options.find(option => option.label === value);
    }, [value, options]);

    const changeHandler = selectedOption => {
        setValue(selectedOption.label);
    }

    return (
        <div className="select-container">
            <Select options={options} value={selectedCountry} onChange={changeHandler} />
        </div>
    );
};
