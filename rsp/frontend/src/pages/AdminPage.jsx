import { useEffect, useState, useCallback } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router"
import {api} from "../lib/axios"
import UserCard from "../components/UserCard"
import UpdateUserModal from "../components/UpdateUserModal"

export default function AdminPage() {
  const { user, loading } = useSelector((state) => state.auth)

  const [users, setUsers] = useState([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)

  // 🔹 fetch users (memoized)
  const fetchUsers = useCallback(async () => {
    try {
      setUsersLoading(true)
      setError(null)

      const res = await api.get("/users")
      console.log("AdminPage",res.data)
      setUsers(res.data.users)
    } catch (err) {
      console.error(err)
      setError("Failed to load users")
    } finally {
      setUsersLoading(false)
    }
  }, [])

  // 🔹 fetch only when admin is confirmed
  useEffect(() => {
    if (user?.role === "admin") {
      fetchUsers()
    }
  }, [user, fetchUsers])

  // ⛔ wait for auth check
  if (loading) return null

  // 🚫 block non-admins
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />
  }

   // 🔹 update user (optimistic + rollback)
  const updateUser = async (id, data) => {
    const prevUsers = users

    setUsers((u) =>
      u.map((user) =>
        user._id === id ? { ...user, ...data } : user
      )
    )

    try {
      await api.put(`/users/${id}`, data)
    } catch (err) {
      console.error(err)
      setUsers(prevUsers)
      alert("Update failed")
    }
  }

  // 🔹 delete user (optimistic)
  const deleteUser = async (id) => {
    const prevUsers = users

    setUsers((u) => u.filter((user) => user._id !== id))

    try {
      await api.delete(`/users/${id}`)
    } catch (err) {
      console.error(err)
      setUsers(prevUsers)
      alert("Delete failed")
    }
  }

  // 🔹 admin actions
  // const updateUser = async (id, data) => {
  //   await api.put(`/users/${id}`, data)
  //   fetchUsers()
  // }

  // const deleteUser = async (id) => {
  //   await api.delete(`/users/${id}`)
  //   setUsers((prev) => prev.filter((u) => u._id !== id)) // optimistic
  // }

  return (
    <div className="p-6 w-full h-74">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>

      {usersLoading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>} <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((u) => (
          <UserCard
            key={u._id}
            user={u}
            isAdmin
            onDelete={() => deleteUser(u._id)}
            onEdit={() => setSelectedUser(u)}
          />
        ))}
      </div>

      {/* ✅ Update user modal */}
      {selectedUser && (
        <UpdateUserModal
          open={!!selectedUser}
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={updateUser}
        />
      )}
    


      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((u) => (
          <UserCard
            key={u._id}
            user={u}
            isAdmin
            onDelete={deleteUser}
            onUpdate={updateUser}
          />
        ))}
      </div> */}
    </div>
  )
}






// import { useEffect, useState } from 'react'
// import { api } from '../lib/axios'
// import UserCard from '../components/UserCard'
// import { useSelector } from 'react-redux'
// import { Navigate } from 'react-router'

// export default function AdminPage () {
//   const { user, loading } = useSelector(state => state.auth)
//   const [users, setUsers] = useState([])

//   const fetchUsers = async () => {
//     const res = await api.get('/users')
//     setUsers(res.data.users)
//   }
//   useEffect(() => {
//     fetchUsers()
//   }, [])

//   // wait for auth check to finish
//   if (loading) return null

//   // block non-admins
//   if (user?.role !== 'admin') {
//     return <Navigate to='/' replace />
//   }

//   const updateUser = async (id, data) => {
//     await api.put(`/users/${id}`, data)
//     fetchUsers()
//   }

//   const deleteUser = async id => {
//     await api.delete(`/users/${id}`)
//     fetchUsers()
//   }

//   return (
//     <div className='grid grid-cols-3 gap-4'>
//       {users.map(u => (
//         <UserCard
//           key={u._id}
//           user={u}
//           isAdmin
//           onDelete={deleteUser}
//           onUpdate={updateUser}
//         />
//       ))}
//     </div>
//   )
// }

// // import React, { useEffect, useState } from 'react'
// // import { api } from "@/lib/axios"
// // import UserCard from "@/components/UserCard"

// // export default function AdminPage() {
// //   const [users, setUsers] = useState([])

// //   useEffect(() => {
// //     api.get("/users").then((res) => setUsers(res.data.users))
// //   }, [])

// //   return (
// //     <div className="grid grid-cols-3 gap-4">
// //       {users.map((u) => (
// //         <UserCard key={u._id} user={u} />
// //       ))}
// //     </div>
// //   )
// // }
