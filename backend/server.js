import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const port = process.env.PORT || 3000;

//routes
import userRouter from "./routes/user.route.js";
import recordRouter from "./routes/record.route.js";
import categoryRouter from "./routes/category.route.js";

app.use("/api/user", userRouter);
app.use("/api/record", recordRouter);
app.use("/api/category", categoryRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
