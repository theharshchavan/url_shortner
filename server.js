import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './db/db.config.js';
import { shortidRoute, shorturlRoute } from './routes/url.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();

// Use environment PORT & Mongo URI or fallback
const PORT = process.env.PORT || 8080;
const dbURL = process.env.MONGODB_URI || "mongodb://localhost:27017/url-shortner";

// Connect to MongoDB
connectDB(dbURL);

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(morgan('dev'))
app.use("/", shorturlRoute);
app.use("/", shortidRoute);

// Home route
app.get('/', (req, res) => {
    res.render("home", { message: null, shortenedUrls: [] });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
