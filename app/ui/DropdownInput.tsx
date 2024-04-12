import React from 'react';

interface DropdownInputProps {
    id: string;
    label: string;
    options: { value: string; label: string }[];
    selectedValue: string;
    onChange: (value: string) => void;
}

const DropdownInput: React.FC<DropdownInputProps> = ({ id, label, options, selectedValue, onChange }) => {
    return (
        <div className="dropdown-input">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                id={id}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={selectedValue}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value} className='text-black'>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropdownInput;
