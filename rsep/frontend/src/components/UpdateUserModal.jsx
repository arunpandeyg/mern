import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { useState } from "react"

export default function UpdateUserModal({ user, open, onClose, onSave }) {
  const [role, setRole] = useState(user.role)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    await onSave(user._id, { role })
    setLoading(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
        </DialogHeader>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
