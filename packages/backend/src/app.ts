import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import logger from "morgan";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/index";
import requestMetadataRouter from "./routes/requestMetadata.routes";
import mocksRouter from "./routes/mocks.routes";

const app = express();

const corsOptions = {
  origin: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: "*",
  credentials: true,
};
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const requestHeaders = req.headers["access-control-request-headers"];
  if (origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    if (requestHeaders) {
      // Echo back exactly what the browser asked to send
      res.header("Access-Control-Allow-Headers", requestHeaders as string);
    } else {
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
  }
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(logger("dev"));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/requests", requestMetadataRouter);
app.use("/mocks", mocksRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Not Found" });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response) => {
  const message = err.message;
  const error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).json({ success: false, message, error });
});

app.listen(3000, () => {
  console.log("Mock server running on http://localhost:3000");
});

export default app;
