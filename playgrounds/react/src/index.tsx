import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import { Button, Paragraph } from '@ds.e/react';
import '@ds.e/scss/lib/Button.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div>
    <div>Hola</div>
    <Button label="Hola" />
    <Paragraph />
  </div>
);
