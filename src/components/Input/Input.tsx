import React from 'react';

interface IProps {
  label: string;
  name: string;
  handleTypeChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  value: string;
  pattern?: string;
  placeholder: string;
}

const Input = ({
  label,
  name,
  handleTypeChange,
  value,
  pattern = undefined,
  placeholder,
}: IProps) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={handleTypeChange}
        pattern={pattern}
        required
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
