import React from 'react';
import { Spacing } from '@ds.e/foundation';

interface MarginProps {
  space?: keyof typeof Spacing;
  children?: React.ReactNode;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
}

const Margin = ({
  space = 'xxs',
  top,
  left,
  bottom,
  right,
  children,
}: MarginProps) => {
  let className = ``;

  if (!top && !left && !bottom && !right) {
    className = `dse-margin-${space}`;
  }

  if (top) {
    className = `${className} dse-margin-top-${space}`;
  } else if (left) {
    className = `${className} dse-margin-left-${space}`;
  } else if (bottom) {
    className = `${className} dse-margin-bottom-${space}`;
  } else if (right) {
    className = `${className} dse-margin-right-${space}`;
  }

  return <div className={className}>{children}</div>;
};

export default Margin;
