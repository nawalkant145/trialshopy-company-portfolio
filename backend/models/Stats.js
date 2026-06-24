import mongoose from 'mongoose';

const statsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: 'global'
  },
  visitorsCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Stats = mongoose.model('Stats', statsSchema);
export default Stats;
