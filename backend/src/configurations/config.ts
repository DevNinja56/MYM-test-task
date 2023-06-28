import * as dotenv from "dotenv"
dotenv.config()

/**
 * Server configuration
 */
const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017"

const MONGO = {
  OPTIONS: MONGO_OPTIONS,
  URL: MONGO_URL
}

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost"
const SERVER_PORT = process.env.SERVER_PORT || 4000

const SERVER = {
  HOSTNAME: SERVER_HOSTNAME,
  PORT: SERVER_PORT
}

const API = {
  PREFIX: process.env.API_PREFIX || "/api/v1"
}
const config = {
  MONGO: MONGO,
  SERVER: SERVER,
  API: API
}

export default config
