import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useState } from "react"

export default function UserCard({ user, isAdmin, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user.name)
  const [role, setRole] = useState(user.role)

  const save = () => {
    onEdit(user._id, { name, role })
    setEditing(false)
  }

  return (
    <div className="border p-4 rounded-md space-y-2 mx-auto">
      <img src={user.image} className="w-24 h-24 rounded-full" />

      {editing ? (
        <>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <Input value={role} onChange={(e) => setRole(e.target.value)} />
          <Button onClick={save}>Save</Button>
        </>
      ) : (
        <>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>Role: {user.role}</p>
        </>
      )}

      {isAdmin && (
        <div className="flex gap-2">
          <Button onClick={() => onEdit(user)}>Edit</Button>
          {/* <Button variant="outline" onClick={() => setEditing(!editing)}>
            Edit
          </Button> */}
          <Button variant="destructive" onClick={() => onDelete(user._id)}>
            Delete
          </Button>
        </div>
      )}
    </div>
  )
}











// import { Button } from "@/components/ui/button"

// export default function UserCard({ user, isAdmin, onDelete }) {
//   return (
//     <div className="border p-4 rounded-md space-y-2">
//       <img src={user.image} className="w-24 h-24 rounded-full" />
//       <p>{user.name}</p>
//       <p>{user.email}</p>
//       <p>Role: {user.role}</p>

//       {isAdmin && (
//         <Button variant="destructive" onClick={() => onDelete(user._id)}>
//           Delete
//         </Button>
//       )}
//     </div>
//   )
// }









// export default function UserCard({ user }) {
//   return (
//     <div className="border p-4 rounded-md">
//       <img src={user.image} className="w-24 h-24 rounded-full" />
//       <p>{user.name}</p>
//       <p>{user.email}</p>
//       <p>Role: {user.role}</p>
//     </div>
//   )
// }
