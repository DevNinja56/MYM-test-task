import express from "express"
import config from "../configurations/config"
import UserRoute from "./user.route"

const router = express.Router()

/**
 * User base routes
 */
router.use(config.API.PREFIX, UserRoute)

export default router
