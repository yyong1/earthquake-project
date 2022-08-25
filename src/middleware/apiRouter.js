import express from 'express';
import { renderToString } from 'react-dom/server';

const router = express.Router();

router.get('/earthqakes', async (req, res) => {
  const earthqakes = await fetch('https://everyearthquake.p.rapidapi.com/significant_month.json', {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '7dfdebe376msh4ee4d1b2efeca7dp1d0963jsn3eefd39b64ca',
      'X-RapidAPI-Host': 'everyearthquake.p.rapidapi.com',
    },
  })
    .then((resp) => resp.json());
  //   console.log(earthqakes);
  res.json(earthqakes.data);
});

router.get('/details/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
});

export default router;
