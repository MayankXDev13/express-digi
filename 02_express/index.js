import express from "express";

const app = express();
const port = 3000;
const hostname = "127.0.0.1";
app.use(express.json());

let teaData = [];
let nextId = 1;

// add a new tea

app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = {
    id: nextId++,
    name,
    price,
  };

  teaData.push(newTea);
  res.status(201).send(newTea);
});

// get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// get  a tea with id

app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send(`Tea not found`);
  }
  res.status(200).send(tea);
});

app.listen(port, () => {
  console.log(`Server is listeng at http://${hostname}:${port}`);
});
