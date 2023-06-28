import User from "../models/user/user.model"
import { UserDocument } from "../models/user/user.interface"
import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose"

/**
 * Save user to the cloud database service
 */
const createUser = async (userData: DocumentDefinition<UserDocument>) => {
  try {
    const response = await User.UserModel.create(userData)

    if (response) {
      return response
    }

    throw new Error(`Sorry some errors occurred while creating user`)
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

/**
 * Check is user exists in the cloud database service
 */
const checkUserExists = async (): Promise<UserDocument | null> => {
  try {
    const response: UserDocument[] | any = await User.UserModel.find({})

    if (response) {
      return response
    }

    throw new Error(`Sorry some errors occurred while finding users`)
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

/**
 * Find User with id from the cloud database service
 */
const findUserById = async (userId: string): Promise<UserDocument | null> => {
  try {
    const response = await User.UserModel.findOne({ _id: userId })

    if (response) {
      return response
    }

    throw new Error(`Sorry some errors occurred while finding user with id`)
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

/**
 * Find Users with pagination from the cloud database service
 */
const findUsers = async (query: FilterQuery<UserDocument>, page: number, limit: number): Promise<any | null> => {
  try {
    const currentPage = page - 1

    const response: any = await User.UserModel.find(query)
      .skip(limit * currentPage)
      .limit(limit)
      .sort({ createdAt: -1 })

    // find count
    const count = await User.UserModel.find().count().exec()
    const totalPage = Math.ceil(count / limit)

    if (response) {
      return {
        data: response,
        count,
        page: +page,
        limit: +limit,
        totalPage,
        nextPage: +page < +totalPage ? +page + 1 : null
      }
    }

    if (response) {
      return response
    }

    throw new Error(`Sorry some errors occurred while finding users`)
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export default {
  createUser,
  checkUserExists,
  findUserById,
  findUsers
}
