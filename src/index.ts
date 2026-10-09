import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './UserRoutes';
import cors from 'cors';

import path from 'node:path';

import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Connection string comes from the environment so no credential is baked into
// the image. Locally it is read from .env (see the dev/start scripts); in Docker
// pass it with `docker run -e MONGO_URI=...`.
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error('Missing MONGO_URI. Set it in .env for local runs, or pass -e MONGO_URI=... to docker run.');
    process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// Frontend (public/index.html)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
app.use('/api', userRoutes);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successful DB connection
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
