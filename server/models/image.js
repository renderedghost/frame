const mongoose = require('mongoose');

// Define the schema for images
const imageSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true, // This field is required
        unique: true,  // This field should be unique to prevent duplicate files
    },
    date: {
        type: Date,
        required: true, // This field is required
        default: Date.now, // Default value is the current date and time
    },
    s3Url: {
        type: String,
        required: true, // This field is required
    },
});

// Consider adding indexes for fields that you query often
imageSchema.index({ date: -1 }); // Example: Index for sorting images by date in descending order

// Export the Mongoose model
module.exports = mongoose.model('Image', imageSchema);