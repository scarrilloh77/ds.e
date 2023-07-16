import React from 'react';
import ReactDOM from 'react-dom/client';
import { Color, Text, Margin, Select } from '@ds.e/react';
import '@ds.e/scss/lib/Utilities.css';
import '@ds.e/scss/lib/Margin.css';
import '@ds.e/scss/lib/Text.css';
import '@ds.e/scss/lib/global.css';

const options = [
  {
    label: 'Strict Black',
    value: 'strict-black',
  },
  {
    label: 'Heavenly Green',
    value: 'heavenly-green',
  },
  {
    label: 'Sweet Pink',
    value: 'pink',
  },
];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div>
    <Color hexCode="#000" height="md" width="md" />
    <Margin space="none">
      <Text size="xs">Hola mundo</Text>
    </Margin>
    <Select options={options} />
  </div>
);
