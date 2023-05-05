import mongoose from 'mongoose';
// const mongoose = require('mongoose');

const { Schema } = mongoose;

const CleanerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  totalwork: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model('Cleaner', CleanerSchema);
