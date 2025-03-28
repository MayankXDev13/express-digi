import express from "express";

const app = express();
const port = 3000;
const hostname = "127.0.0.1";


app.get('/', (req, res) => {
    res.send('Hello from Mayank and his tea!')
})

app.listen(port, () => {
  console.log(`Server is listeng at http://${hostname}:${port}`);
});
