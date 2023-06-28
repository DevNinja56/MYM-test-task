import { object, string, number } from "yup"

const UserValidationSchema = object({
  id: number(),
  name: string(),
  username: string(),
  email: string().email(),
  address: object(),
  phone: string(),
  website: string(),
  company: object()
})

export default UserValidationSchema
