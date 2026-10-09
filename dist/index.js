"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
const cors_1 = __importDefault(require("cors"));
const node_path_1 = __importDefault(require("node:path"));
const node_dns_1 = __importDefault(require("node:dns"));
node_dns_1.default.setServers(["1.1.1.1", "8.8.8.8"]);
const app = (0, express_1.default)();
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
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Frontend (public/index.html)
app.use(express_1.default.static(node_path_1.default.join(__dirname, '..', 'public')));
// Routes
app.use('/api', UserRoutes_1.default);
// Connect to MongoDB
mongoose_1.default.connect(MONGO_URI)
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
