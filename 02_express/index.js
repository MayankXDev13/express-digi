import express from "express";
import "dotenv/config";
import logger from "./logger.js";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 3000;

const morganFormat = ":method :url :status :response-time ms";

/*
app.get("/", (req, res) => {
  res.send("Hello from Hitesh and his tea!");
});

app.get("/ice-tea", (req, res) => {
  res.send("What ice tea would you prefer?");
});

app.get("/twitter", (req, res) => {
  res.send("hiteshdotcom");
});
*/

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

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

// update tea

app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send(`Tea not found`);
  }
  const { name, price } = req.body;
  (tea.name = name), (tea.price = price);
  res.status(200).send(tea);
});

// delete tea

app.delete("/teas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = teaData.findIndex((t) => t.id === id);

  if (index === -1) {
    console.log("Tea not found");
    return res.status(404).json({ message: "Tea not found" });
  }

  teaData.splice(index, 1);

  res.status(204).end(); // No content should be sent with 204
});

app.listen(port, () => {
  console.log(`Server is listeng at http://${hostname}:${port}`);
});
