import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { ContextProvider } from "./context/context";

ReactDOM.render(
 
    <ContextProvider>
       <App />
    </ContextProvider>
    
 ,
  document.getElementById('root')
);

