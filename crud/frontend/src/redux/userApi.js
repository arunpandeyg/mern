import { api } from "../lib/axios"

export const updateMyImage = (formData) =>
  api.put("/users/me/image", formData)