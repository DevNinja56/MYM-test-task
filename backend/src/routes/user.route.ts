import express from "express"
import { URL } from "../configurations/constants"
import UserController from "../controllers/user.controller"
import Validation from "../middlewares/validation.middleware"
import UserValidationSchema from "../validation/user.schema"

const UserRoute = express.Router()

/**
 * Save user to the cloud database route
 */
UserRoute.post(URL.USER.CREATE, Validation(UserValidationSchema), UserController.createUser)

/**
 * Check is user exists in the cloud database route
 */
UserRoute.get(URL.USER.EXISTS, UserController.checkUserExists)

/**
 * Find Users with pagination from the cloud database route
 */
UserRoute.get(URL.USER.GET_ALL_PAGINATED, UserController.findUsersWithPagination)

/**
 * Find User with id from the cloud database route
 */
UserRoute.get(URL.USER.GET_BY_ID, UserController.findUserById)

export default UserRoute
