import express from "express";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  console.log("loading dotenv");
  dotenv.config();
}

const SERVER_PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.get("/", (_req, res) => {
  res.send("healthy");
});

app.listen(SERVER_PORT, console.log("Insanity is live"));
