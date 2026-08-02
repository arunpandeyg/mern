import { api } from "./axios"

export const updateMyImage = (formData) =>
  api.put("/users/me/image", formData)