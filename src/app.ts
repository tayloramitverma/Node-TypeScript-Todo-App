import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import todosRoute from "./routes/todos";

const app = express();

app.use(json());
app.use("/todos", todosRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(5002, () => {
  console.log("Server is running on port:5002");
});
