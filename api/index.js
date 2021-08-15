import express from 'express';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../config';
//import data from '../src/testData.json';

let mdb;
MongoClient.connect(config.mongodbUri, (err, client) => {
  assert.equal(null, err);
  console.log('connection made with the db...');
  mdb = client.db(config.dbName);
});

const router = express.Router();
// const contests = data.contests.reduce((acc, curr) => {
//   acc[curr.id] = curr;
//   return acc;
// }, {});

router.get('/contests', async (req, res) => {
  // res.send({
  //   contests,
  // });
  let contests = {};

  const findResults = await mdb
    .collection('contests')
    .find({})
    .project({
      id: 1,
      categoryName: 1,
      contestName: 1,
    })
    .toArray();
  findResults &&
    findResults.forEach((result) => {
      contests[result.id] = result;
    });

  res.send({ contests });
});

router.get('/contests/:contestId', async (req, res) => {
  // let contest = contests[req.params.contestId];
  // contest.description =
  //   'Lorem Ipsum is simply dummy text of the printing and typesetting industry';
  // res.send(contest);
  await mdb
    .collection('contests')
    .findOne({ id: Number(req.params.contestId) })
    .then((contest) => res.send(contest))
    .catch(console.error);
});

export default router;
