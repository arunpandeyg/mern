import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import UserCard from "../components/UserCard"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { fetchMe } from "../store/authSlice"
import { updateMyImage } from "../lib/userApi"

export default function UserPage() {
  const { user } = useSelector((state) => state.auth)
   const dispatch = useDispatch()
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const updateImage = async () => {
    if (!image) return

    const formData = new FormData()
    formData.append("image", image)

    setLoading(true)
    await updateMyImage(formData)
    await dispatch(fetchMe()) // refresh user
    setLoading(false)
  }
  return (
     <div className="space-y-1 mx-auto max-w-md">
      <UserCard user={user} />

      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <Button onClick={updateImage} disabled={loading}>
        {loading ? "Updating..." : "Update Image"}
      </Button>
    </div>
  )
}

