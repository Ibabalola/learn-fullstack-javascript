import express from 'express';
import data from '../src/testData.json';

const router = express.Router();
const contests = data.contests.reduce((acc, curr) => {
  acc[curr.id] = curr;
  return acc;
}, {});

router.get('/contests', (req, res) => {
  res.send({
    contests,
  });
});

router.get('/contests/:contestId', (req, res) => {
  let contest = contests[req.params.contestId];
  contest.description =
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry';
  res.send(contest);
});

export default router;
