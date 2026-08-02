import mongoose from "mongoose";


const imageSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

const Image = mongoose.models.Image || mongoose.model('Image', imageSchema);
    
export default Image;