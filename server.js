/** import core packages */
import "dotenv/config";
import express from "express";

/** import extension packages */
import cors from "cors";

/** import middlewares, routers, database and other config */
import rateLimit from "./middlewares/rate-limit.middleware.js";
import router from "./middlewares/router.middleware.js";
import endpointNotFoundHandler from "./middlewares/endpoint-not-found-handler.middleware.js";
import db from "./config/mongodb.config.js";

/** declare environment variables */
const HTTP_PORT = Number(process.env.PORT) || 3000;

/** set application configuration */
await db();
const app = express();
app.use(rateLimit);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** route and error routing handler */
app.use("/", router);
app.use(endpointNotFoundHandler);

/** start server listening */
app.listen(HTTP_PORT, () => console.log("server listening on port:", HTTP_PORT));
