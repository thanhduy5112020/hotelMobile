import mongoose from 'mongoose';

const { Schema } = mongoose;

const JobSchema = new Schema({
  nameCleaner: {
    type: String,
  },
  roomNumber: {
    type: Number,
  },
  nameHotel: {
    type: String,
  },
  scheduledTime: {
    type: String,
    default: "2023-05-05"
  },
 
});

export default mongoose.model('Job', JobSchema);
