import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  console.log("loading dotenv");
  dotenv.config();
}

export const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify({ status: "healthy" }));
});
