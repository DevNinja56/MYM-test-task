import { Schema, model } from "mongoose"
import { UserDocument } from "./user.interface"

/**
 * Create user schema for database interactions
 */
const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: Schema.Types.String,
      required: true
    },
    username: {
      type: Schema.Types.String,
      required: true
    },
    email: {
      type: Schema.Types.String,
      required: true
    },
    address: {
      type: Object,
      required: true
    },
    phone: {
      type: Schema.Types.String,
      required: true
    },
    website: {
      type: Schema.Types.String,
      required: true
    },
    company: {
      type: Object,
      required: true
    }
  },
  {
    timestamps: true,
    minimize: false
  }
)

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret, options) {
    delete ret._id
    delete ret.__v
  }
})

const UserModel = model<UserDocument>("user", userSchema, "users")

export default { UserModel }
