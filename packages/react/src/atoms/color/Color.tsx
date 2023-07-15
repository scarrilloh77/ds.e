import React from 'react';
import Spacing from '../../foundation/Spacing';

interface ColorProps {
  hexCode: string;
  width?: keyof typeof Spacing;
  height?: keyof typeof Spacing;
}

const Color = ({
  hexCode,
  width = Spacing.sm as ColorProps['width'],
  height = Spacing.sm as ColorProps['width'],
}: ColorProps) => {
  const className = `dse-width-${width} dse-height-${height}`;
  return <div className={className} style={{ backgroundColor: hexCode }}></div>;
};

export default Color;
