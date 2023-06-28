import express, { Express, NextFunction, Request, Response } from "express"
import cors from "cors"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import config from "./configurations/config"
import logging from "./utils/logging"
import Routes from "./routes/router"

const app: Express = express()

const NAMESPACE = "Server"

app.use(express.static("./public"))

mongoose.set("strictQuery", false)

/**
 * MongoDB Connection
 */
mongoose
  .connect(config.MONGO.URL)
  .then(() => {
    logging.info(NAMESPACE, "Mongo Connected")
  })
  .catch((error) => {
    logging.error(NAMESPACE, error.message, error)
  })

mongoose.Promise = global.Promise

app.use(
  cors({
    origin: ["*"],
    methods: "GET,POST,PUT,DELETE,OPTIONS"
  })
)

app.use((req, res, next) => {
  logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

  res.on("finish", () => {
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    )
  })
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
    return res.status(200).json({})
  }

  next()
})

/**
 * Base Routes
 */
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: true, message: "Welcome to Backend." })
})

app.get(config.API.PREFIX, (req: Request, res: Response) => {
  res.status(200).json({ status: true, message: "Welcome to Backend." })
})

app.use(Routes)

app.use("*", (req, res) => {
  return res.status(404).json({
    status: false,
    message: "API not exist"
  })
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    status: false,
    message: err.message
  })
})

app.listen(config.SERVER.PORT, () => {
  logging.info(NAMESPACE, `Server is running ${config.SERVER.HOSTNAME}:${config.SERVER.PORT}`)
})
