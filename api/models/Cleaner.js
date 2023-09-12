import mongoose from 'mongoose';
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
  workplace: {
    type: String,
    default: "Duy Hotel",
  }
});

export default mongoose.model('Cleaner', CleanerSchema);
