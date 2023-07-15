import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import { Color } from '@ds.e/react';
import '@ds.e/scss/lib/Button.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div>
    <Color hexCode="#000" width="1rem" height="1rem" />
  </div>
);
