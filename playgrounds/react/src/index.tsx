import React from 'react';
import ReactDOM from 'react-dom/client';
import { Color, Text, Margin } from '@ds.e/react';
import '@ds.e/scss/lib/Utilities.css';
import '@ds.e/scss/lib/Margin.css';
import '@ds.e/scss/lib/Text.css';
import '@ds.e/scss/lib/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div>
    <Color hexCode="#000" height="md" width="md" />
    <Margin left space="xl">
      <Text size="xs">Hola mundo</Text>
    </Margin>
  </div>
);
