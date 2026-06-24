import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['founder', 'core', 'advisor'],
    default: 'core'
  },
  bio: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
}, { timestamps: true });

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
export default TeamMember;
