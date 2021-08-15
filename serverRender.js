// fetch the data from the api
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/components/App';
import axios from 'axios';
import config from './config';

const getApiUrl = (contestId) =>
  contestId
    ? `${config.serverUrl}/api/contests/${contestId}`
    : `${config.serverUrl}/api/contests`;

const getInitialData = (contestId, apiData) => {
  if (contestId) {
    return {
      currentContestId: apiData.id,
      contests: {
        [apiData.id]: apiData,
      },
    };
  }

  return {
    contests: apiData.contests,
  };
};

const serverRender = (contestId) =>
  axios
    .get(getApiUrl(contestId))
    .then((res) => {
      const initialData = getInitialData(contestId, res.data);
      return {
        initialMarkup: ReactDOMServer.renderToString(
          <App initialData={initialData} />
        ),
        initialData: initialData,
      };
    })
    .catch((err) => {
      console.log(err);
    });

export default serverRender;
