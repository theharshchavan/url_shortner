import express from 'express';
import { handleToShortUrl, handleredirect } from '../controllers/url.controllers.js';

const shortidRoute = express.Router();
const shorturlRoute = express.Router();


// GET route for redirection using shortID
shortidRoute.get("/:shortID", handleredirect);

// POST route to generate a short URL
shorturlRoute.post("/shorturl", handleToShortUrl);

export {shortidRoute, shorturlRoute};
