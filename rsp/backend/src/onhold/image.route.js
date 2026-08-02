import express from 'express';
import { imageUpload } from './imageUpload.controller.js';
import {uploadImage} from './imageUpload.controller.js';

const router = express.Router();

router.post('/image', imageUpload, uploadImage);

export default router;