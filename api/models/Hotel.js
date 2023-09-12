import mongoose from 'mongoose';
const { Schema } = mongoose;

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    title: {
        type: String,
    },
    photos: {
        type: [String],
        default: ["http://res.cloudinary.com/drsoiwmse/image/upload/v1679899575/upload/tahothoj3tdx5hguqvrn.jpg"]
      },
    desc: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 8.1
    },
    rooms: {
        type: [String],
    },
    cheapestPrice: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    total: {
        type: Number,
        default: 10
    },
    totalReviews: {
        type: Number,
        default: 1,
    },
})

// HotelSchema.pre('save', function(next) {
//     if (!this.photos || this.photos.length === 0) {
//       this.photos = ['https://media.gettyimages.com/photos/luxurious-master-bedroom-interior-picture-id1266155645?k=20&m=1266155645&s=612x612&w=0&h=-F1NIvzuxtUPQRnrndhTM3X4EdM-Qt1GKDfN4coCqEs='];
//     }
//     next();
//   });

export default mongoose.model("Hotel", HotelSchema)