import express from 'express';
import { deleteUser, getAllUsers, getSingleUser, signin, signout, signup, updateUser } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signout', signout)
router.get('/', getAllUsers)
router.get('/:id', getSingleUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)



export default router;