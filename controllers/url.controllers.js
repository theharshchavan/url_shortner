import shortid from "shortid";
import url from '../models/url.model.js';

async function handleToShortUrl(req, res) {
    const redirectURL = req.body.longUrl;
    const shortID = shortid.generate();
    try {
        if (!redirectURL) {
            return res.status(400).send("Please send a valid URL");
        }

        await url.create({
            shortID: shortID,
            redirectURL: redirectURL
        });

        // Dynamically get domain for deployment (localhost or deployed domain)
        const host = 'bti.x';
        const protocol = req.protocol;

        res.status(200).render("home", {
            message: "URL shortened successfully",
            shortenedUrls: [{
                originalUrl: redirectURL,
                shortUrl: `${protocol}://${host}/${shortID}`
            }]
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Something went wrong" });
    }
}

async function handleredirect(req, res) {
    const shortID = req.params.shortID;
    try {
        const entry = await url.findOne({ shortID: shortID });
        if (!entry) {
            return res.status(404).send("URL not found");
        }

        res.redirect(entry.redirectURL);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
}

export { handleToShortUrl, handleredirect };
