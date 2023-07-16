import React from 'react';
import { FontSize } from '@ds.e/foundation';

interface TextProps {
  size?: keyof typeof FontSize;
  children: React.ReactNode;
}

const Text = ({
  size = FontSize.base as TextProps['size'],
  children,
}: TextProps) => {
  const className = `dse-text dse-text-${size}`;
  return <div className={className}>{children}</div>;
};

export default Text;
