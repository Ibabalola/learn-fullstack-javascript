import https from 'https';
import http from 'http';
import express from 'express';
import fs from 'fs';
import config, { nodeEnv, logStars } from './config';
import api from './api';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import serverRender from './serverRender';

// console.log(config, nodeEnv);
// logStars('Hello World');

// https.get('https://www.arsenal.com', res => {
//   // recieve a response stream
//   console.log('Response status code:', res.statusCode);

//   // listen for data events on the stream
//   res.on('data', chunk => {
//     console.log(chunk.toString());
//   });
// });

// use http module as server
// const server = http.createServer();

// // run server on a certain port
// server.listen(1234);

// // event emitter object which we can subscribe to
// server.on('request', (req, res) => {
//   res.write('Hello HTTP!\n');
//   setTimeout(() => {
//     res.write('I can stream!\n');
//     res.end();
//   }, 3000);
// });

const server = express();

// have sass file available upon page load using middleware
server.use(
  sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public'),
  })
);

// set view engine to be EJS
server.set('view engine', 'ejs');

// server rendered react code from back end
server.get(['/', '/contest/:contestId'], (req, res) => {
  //res.send('Hello Express');
  // res.render('index', {
  //   content: 'Hello Express <em>EJS!</em>',
  // });
  serverRender(req.params.contestId)
    .then(({ initialMarkup, initialData }) => {
      res.render('index', {
        initialMarkup,
        data: initialData,
      });
    })
    .catch(console.error);
});

// group of routes
server.use('/api', api);

// Using a static middleware
server.use(express.static('public'));

// server.get('/about.html', (req, res) => {
//   fs.readFile('./about.html', (err, data) => {
//     res.send(data.toString());
//   });
// });

server.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});
