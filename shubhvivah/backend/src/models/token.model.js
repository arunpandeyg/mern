import mongoose from 'mongoose';
const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },  
  refreshToken: {
    type: String,   
  },
  expiresAt: {
    type: Date,    
  },
},{
  timestamps: true,
});

const Token = mongoose.models.Token || mongoose.model('Token', tokenSchema);
export default Token;