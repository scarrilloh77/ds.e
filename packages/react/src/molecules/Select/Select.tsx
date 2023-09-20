import React, {
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import Text from '../../atoms/text';

const KEY_CODES = {
  ENTER: 'Enter',
  SPACE: ' ',
  DOWN_ARROW: 'ArrowDown',
  UP_ARROW: 'ArrowUp',
  ESC: 'Escape',
};

interface SelectOption {
  label: string;
  value: string;
}

interface RenderOptionProps {
  isSelected: boolean;
  option: SelectOption;
  getOptionRecommendedProps: (overrideProps?: Object) => Object;
}

interface SelectProps {
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
  options?: SelectOption[];
  label?: string;
  renderOption?: (props: RenderOptionProps) => React.ReactNode;
}

const getPreviousOptionIndex = (
  currentIndex: number | null,
  options: Array<SelectOption>
) => {
  if (currentIndex === null) {
    return 0;
  }

  if (currentIndex === 0) {
    return options.length - 1;
  }

  return currentIndex - 1;
};

const getNextOptionIndex = (
  currentIndex: number | null,
  options: Array<SelectOption>
) => {
  if (currentIndex === null || currentIndex === options.length - 1) {
    return 0;
  }
  return currentIndex + 1;
};

const Select = ({
  options = [],
  label = 'Please select an option',
  onOptionSelected: handler,
  renderOption,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<null | number>(null);
  const [overlayTop, setOverlayTop] = useState<number>(0);
  const labelRef = useRef<HTMLButtonElement>(null);
  const [optionRefs, setOptionRefs] = useState<
    React.RefObject<HTMLLIElement>[]
  >([]);

  const onLabelClick = () => {
    setIsOpen((prev) => !prev);
  };

  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
    handler && handler(option, optionIndex);
    setSelectedIndex(optionIndex);
    setIsOpen(false);
  };

  let selectedOption = null;

  if (selectedIndex !== null) {
    selectedOption = options[selectedIndex];
  }

  const highlightItem = (optionIndex: number | null) => {
    setHighlightedIndex(optionIndex);
  };

  const onButtonKeyDown: KeyboardEventHandler = (event) => {
    event.preventDefault();
    console.log(event.key);
    if (
      [KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(
        event.key
      )
    ) {
      setIsOpen(true);
      highlightItem(0);
    }
  };

  const onOptionKeyDown: KeyboardEventHandler = (event) => {
    console.log(event.key);
    if (event.key === KEY_CODES.ESC) {
      setIsOpen(false);
      return;
    }
    if (event.key === KEY_CODES.DOWN_ARROW) {
      highlightItem(getNextOptionIndex(highlightedIndex, options));
    }

    if (event.key === KEY_CODES.UP_ARROW) {
      highlightItem(getPreviousOptionIndex(highlightedIndex, options));
    }

    if (event.key === KEY_CODES.ENTER) {
      onOptionSelected(options[highlightedIndex!], highlightedIndex!);
    }
  };

  useEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 5);
  }, [labelRef.current?.offsetHeight]);

  useEffect(() => {
    setOptionRefs(options.map((_) => React.createRef<HTMLLIElement>()));
  }, [options.length]);

  useEffect(() => {
    if (highlightedIndex !== null && isOpen) {
      const ref = optionRefs[highlightedIndex];
      if (ref && ref.current) {
        ref.current.focus();
      }
    }
  }, [isOpen, highlightedIndex]);

  return (
    <div className='dse-select'>
      <button
        data-testid='DseSelectButton'
        onKeyDown={onButtonKeyDown}
        aria-controls='dse-select-list'
        aria-haspopup={true}
        aria-expanded={isOpen ? true : undefined}
        ref={labelRef}
        className='dse-select__label'
        onClick={onLabelClick}
      >
        <Text>{selectedOption === null ? label : selectedOption.label}</Text>
        <svg
          className={`w-6 h-6 dse-select__caret ${
            isOpen ? 'dse-select__caret--open' : 'dse-select__caret--closed'
          }`}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          width='1rem'
          height='1rem'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 8.25l-7.5 7.5-7.5-7.5'
          />
        </svg>
      </button>
      {isOpen && (
        <ul
          role='menu'
          id='dse-select-list'
          className='dse-select__overlay'
          style={{ top: overlayTop }}
        >
          {options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;
            const isHighlighted = highlightedIndex === optionIndex;

            const ref = optionRefs[optionIndex];

            const renderOptionProps = {
              option,
              isSelected,
              getOptionRecommendedProps: (overrideProps = {}) => {
                return {
                  ref,
                  role: 'menuitemradio',
                  'aria-label': option.label,
                  'aria-checked': isSelected ? true : undefined,
                  onKeyDown: onOptionKeyDown,
                  tabIndex: isHighlighted ? -1 : 0,
                  onMouseEnter: () => highlightItem(optionIndex),
                  onMouseLeave: () => highlightItem(null),
                  className: `dse-select__option ${
                    isSelected ? 'dse-select__option--selected' : ''
                  } ${isHighlighted ? 'dse-select__option--highlighted' : ''}`,
                  key: option.value,
                  onClick: () => onOptionSelected(option, optionIndex),
                  ...overrideProps,
                };
              },
            };

            if (renderOption) {
              return renderOption(renderOptionProps);
            }

            return (
              <li {...renderOptionProps.getOptionRecommendedProps()}>
                <Text>{option.label}</Text>
                {isSelected && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                    width='1rem'
                    height='1rem'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4.5 12.75l6 6 9-13.5'
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
