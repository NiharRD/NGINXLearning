import express from "express";

const app = express();

const PORT = process.env.PORT || 8001;

app.get("/", (req, res) => {
  res.json({ message: "Hello from the server v 1.1 ci cd hehe" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
