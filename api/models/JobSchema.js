import mongoose from 'mongoose';
const mongoose = require('mongoose');

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
    type: Date,
  },
 
});

export default mongoose.model('Job', JobSchema);
