import createError, { HttpError } from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import https from "https";
import http from "http";
import fs from "fs";
import path from "path";

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware setup
app.options("*", cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  // Set locals, only providing error in development
  const message = err.message;
  const error = req.app.get("env") === "development" ? err : {};

  // Send error response
  res.status(err.status || 500).json({
    success: false,
    message: message,
    error: error,
  });
});

// SSL configuration
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, "../ssl/private.key")),
  cert: fs.readFileSync(path.join(__dirname, "../ssl/certificate.pem")),
};

// Create HTTP server
const httpServer = http.createServer(app);
httpServer.listen(3000, () => {
  console.log("HTTP Server running on port 3000");
});

// Create HTTPS server
const httpsServer = https.createServer(sslOptions, app);
httpsServer.listen(3443, () => {
  console.log("HTTPS Server running on port 3443");
});

export default app;
