const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

// When the connection is connected
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection is closed due to app termination');
    process.exit(0);
});

module.exports = connectDB;