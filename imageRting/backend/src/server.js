// FILE: src/server.js
const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_DB_URI;


if (!MONGO_URI) {
console.error('MONGO_URI not set in env');
process.exit(1);
}


mongoose
.connect(MONGO_DB_URI)
.then(() => {
console.log('Connected to MongoDB');
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => {
console.error('MongoDB connection error:', err);
process.exit(1);
});