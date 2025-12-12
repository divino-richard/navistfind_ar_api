import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import { authenticate } from "./middlewares/auth.middleware";
import { errorHandler } from "./middlewares/error-handler.middlewarte";
import anchorRoutes from "./routes/anchor.routes";

dotenv.config();

const app = express();
const v1Router = express.Router();

const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

v1Router.use(authenticate);
app.use("/v1", v1Router);

v1Router.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    version: "1.0",
    message: "NavistFind AR API is up and running",
  });
});

v1Router.use("/anchors", anchorRoutes);

// Error handler (keep this LAST)
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
