// fetch the data from the api
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/components/App';
import axios from 'axios';
import config from './config';

const serverRender = () =>
  axios
    .get(`${config.serverUrl}/api/contests`)
    .then((res) => ({
      initialMarkup: ReactDOMServer.renderToString(
        <App initialContests={res.data.contests} />
      ),
      initialData: res.data,
    }))
    .catch((err) => {
      console.log(err);
    });

export default serverRender;
