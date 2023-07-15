import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import { Color, Text } from '@ds.e/react';
import '@ds.e/scss/lib/Utilities.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div>
    <Color hexCode="#000" height="md" width="xxxl" />
    <Text>Hola mundo</Text>
  </div>
);
