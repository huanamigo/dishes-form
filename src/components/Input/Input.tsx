import React from 'react';

interface IProps {
  label: string;
  name: string;
  handleTypeChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  pattern?: string;
  placeholder: string;
  validation: string | undefined;
  max?: number;
  type: string;
  step?: number;
  touched?: boolean;
}

const Input = ({
  label,
  name,
  handleTypeChange,
  handleInputChange,
  value,
  pattern = undefined,
  placeholder,
  validation,
  type,
  max,
  step,
  touched,
}: IProps) => {
  const paragraphStyle = { height: 'initial', opacity: '1' };
  const borderStyleError = { borderBottom: '2px solid red' };
  const borderStyleNormal = { borderBottom: '2px solid gray' };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleTypeChange || handleInputChange}
        pattern={pattern}
        placeholder={placeholder}
        min={1}
        step={step}
        max={max}
        style={
          validation !== '' && touched ? borderStyleError : borderStyleNormal
        }
      />
      <p style={validation !== '' && touched ? paragraphStyle : undefined}>
        {touched ? validation : null}
      </p>
    </div>
  );
};

export default Input;
