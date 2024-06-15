import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  console.log("loading dotenv");
  dotenv.config({ path: ".env.dev" });
}

const SERVER_PORT = process.env.SERVER_PORT || 3000;

export const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify({ status: "healthy" }));
});

app.listen(SERVER_PORT, () => console.log(`Server is live at ${SERVER_PORT}`));
