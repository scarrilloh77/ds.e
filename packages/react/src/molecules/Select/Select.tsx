import React, { useEffect, useRef, useState } from 'react';
import Text from '../../atoms/Text';

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
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const [overlayTop, setOverlayTop] = useState<number>(0);
  const labelRef = useRef<HTMLButtonElement>(null);

  const onLabelClick = () => {
    setIsOpen((prev) => !prev);
  };

  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
    handler && handler(option, optionIndex);
    setSelectedIndex(optionIndex);
  };

  useEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 5);
  }, [labelRef.current?.offsetHeight]);

  let selectedOption = null;

  if (selectedIndex !== null) {
    selectedOption = options[selectedIndex];
  }

  return (
    <div className="dse-select">
      <button
        ref={labelRef}
        className="dse-select__label"
        onClick={onLabelClick}
      >
        <Text>{selectedOption === null ? label : selectedOption.label}</Text>
        <svg
          className={`w-6 h-6 dse-select__caret ${
            isOpen ? 'dse-select__caret--open' : 'dse-select__caret--closed'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          width="1rem"
          height="1rem"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className="dse-select__overlay" style={{ top: overlayTop }}>
          {options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;
            return (
              <li
                key={option.value}
                className={`dse-select__option ${
                  isSelected
                    ? 'dse-select__option--selected dse-select__option--no-hover'
                    : ''
                }`}
                onClick={() => onOptionSelected(option, optionIndex)}
              >
                <Text>{option.label}</Text>
                {isSelected && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    width="1rem"
                    height="1rem"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
