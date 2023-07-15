import React from 'react';
interface ColorProps {
    hexCode: string;
    width: string;
    height: string;
}
declare const Color: ({ hexCode, width, height }: ColorProps) => React.JSX.Element;
export default Color;
