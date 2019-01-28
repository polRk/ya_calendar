import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { IConference } from './ConferenceItem';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const request = fetch('https://raw.githubusercontent.com/tech-conferences/conference-data/master/conferences/2019/javascript.json');

const render = (data: IConference[]) =>
  ReactDOM.render(
    <App data={data}/>,
    document.getElementById('root') as HTMLElement
  );

if (navigator.onLine) {
  request
    .then(async response => {
      const conferences: IConference[] = await response.json() || [];
      localStorage.setItem('conferences', JSON.stringify(conferences));
      render(conferences);
    })
    .catch(e => {
      render(JSON.parse(localStorage.getItem('conferences') || '') || []);
    });
} else {
  render(JSON.parse(localStorage.getItem('conferences') || '') || []);
}


registerServiceWorker();
