import React, { useState } from 'react';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
  options?: SelectOption[];
  label?: string;
}

const Select = ({
  options = [],
  label = 'Please select an option',
  onOptionSelected: handler,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onLabelClick = () => {
    setIsOpen((prev) => !prev);
  };

  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
    handler && handler(option, optionIndex);
  };

  return (
    <div>
      <button onClick={onLabelClick}>{label}</button>
      {isOpen && (
        <ul>
          {options.map((option, optionIndex) => (
            <li
              key={option.value}
              onClick={() => onOptionSelected(option, optionIndex)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
