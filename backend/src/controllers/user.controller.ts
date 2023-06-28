import { NextFunction, Request, Response } from "express"
import UserService from "../services/user.service"
import { UserDocument } from "../models/user/user.interface"

/**
 * Save user to the cloud database controller
 */
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload: UserDocument = req.body

    await UserService.createUser(payload).then((response) => {
      return res.status(201).json({
        status: true,
        data: response
      })
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Check is user exists in the cloud database controller
 */
const checkUserExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserService.checkUserExists().then((response: UserDocument[] | any) => {
      return res.status(200).json({
        status: true,
        exist: response && response.length > 0 ? true : false
      })
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Find Users with pagination from the cloud database controller
 */
const findUsersWithPagination = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 25 }: any = req.query
    const query = req.body

    await UserService.findUsers(query, page, limit).then((response) => {
      return res.status(200).json({
        status: true,
        data: response
      })
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Find User with id from the cloud database controller
 */
const findUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId: string = req.params.userId

    await UserService.findUserById(userId).then((response) => {
      return res.status(200).json({
        status: true,
        data: response
      })
    })
  } catch (error) {
    next(error)
  }
}

export default {
  createUser,
  checkUserExists,
  findUserById,
  findUsersWithPagination
}
