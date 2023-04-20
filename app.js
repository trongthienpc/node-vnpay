import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/transaction-confirm", (req, res) => {
  res.send("I got a transaction confirmation");
});

app.listen(443, () => {
  console.log("Example app listening on port 443!");
});
