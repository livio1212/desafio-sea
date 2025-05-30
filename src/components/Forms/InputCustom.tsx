import React from 'react';

interface InputCustomProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLenght?: number;
  required?: boolean;
}

const InputCustom: React.FC<InputCustomProps> = ({ placeholder, value, onChange, maxLenght, required }) => {

  const inputStyle: React.CSSProperties = {
    padding: '12px',
    border: '1px solid #649FBF',
    borderRadius: '10px',
    alignItems: 'center',
    width: '100%'
  };

  return (
    <input
      type="text"
      style={inputStyle}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLenght}
      required={required}
    />
  );
}

export default InputCustom;
