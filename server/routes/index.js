const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(
  PORT,
  () => console.log(`Listening on http://localhost:${PORT}`)
);

app.get('/tshirt', (req, res) => {
  res.status(200).send({
    id: '1',
    size: 'large',
  });
});

app.post('/tshirt/:id', (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const { logo } = req.body;

  console.log(logo);

  if (!logo) {
    res.status(418).send({
      message: "We need a logo!"
    })
  } else {
    res.send({
      id: `tshirt with your ${logo} and ${id}`,
    });
  }

});