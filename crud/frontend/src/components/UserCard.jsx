import { Button } from './ui/button'
import { Card } from './ui/card'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { deleteUser } from '../features/userSlice'
import { toast } from 'sonner'

export default function UserCard ({ user }) {
   const admin = true
  const navigate = useNavigate()
  const dispatch = useDispatch()
 

  const handleDelete = () => {
    dispatch(deleteUser(user._id))
    toast.success('User deleted successfully!')
  }
  return (
    <Card className='items-center justify-center p-4 shadow-lg '>
      <img
        src={user.image}
        className='w-25 h-25 mt-4 rounded-lg'
        alt='user important'
      />
      <div className='flex flex-col gap-4 mt-4'>
        <div className='flex text-center justify-between gap-1 text-sm'>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
        <div className='flex text-center justify-between gap-1 text-sm'>
          <p>Phone: {user.phone}</p>
          <p>Role: {user.role}</p>
        </div>
        <div className='flex text-center justify-between gap-1 text-sm'>
          <p>Gender: {user.gender}</p>
          <p>Comm: {user.community}</p>
        </div>
        {admin ? (
          <div className='flex text-center justify-between gap-1 text-sm '>
            <Button
              onClick={() => navigate(`/update/${user._id}`)}
              variant='outline '
              className={
                'hover:bg-orange-500  hover:text-white cursor-pointer border border-orange-500 rounded-lg shadow-b-md '
              }
            >
              Update
            </Button>
            <Button
              onClick={handleDelete}
              variant='outline '
              className={
                'hover:bg-orange-500 hover:text-white cursor-pointer border border-orange-500 rounded-lg shadow-b-md '
              }
            >
              Delete
            </Button>
          </div>
        ) : (
          <div>
            <div className='flex text-center justify-between gap-1 text-sm '>
              <Button
                onClick={() => navigate(`/update/${user._id}`)}
                variant='outline '
                className={
                  'hover:bg-orange-500  hover:text-white cursor-pointer border border-orange-500 rounded-lg shadow-b-md mx-auto'
                }
              >
                Update
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
