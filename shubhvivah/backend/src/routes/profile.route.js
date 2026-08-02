import express from 'express';
import { createProfile, deleteProfile, getAllProfiles, getCurrentProfile, getSingleProfile, updateProfile } from '../controllers/profile.controller.js';


const router = express.Router();


router.post('/create', createProfile);
router.put('/update/:id', updateProfile); 
router.delete('/delete/:id', deleteProfile); 
router.get('/all', getAllProfiles); 
router.get('/:id', getSingleProfile);
router.get('/current', getCurrentProfile); 




export default router;