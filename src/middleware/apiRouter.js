import express from 'express';

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
  res.json(earthqakes.data);
});

router.get('/details/:id', async (req, res) => {
  const { id } = req.params;
  const earthqake = await fetch('https://everyearthquake.p.rapidapi.com/significant_month.json', {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '7dfdebe376msh4ee4d1b2efeca7dp1d0963jsn3eefd39b64ca',
      'X-RapidAPI-Host': 'everyearthquake.p.rapidapi.com',
    },
  })
    .then((resp) => resp.json())
    .then((response) => response.data)
    .then((resData) => resData.filter((elem) => elem.id === `${id}`));
  res.json(earthqake);
});

export default router;
